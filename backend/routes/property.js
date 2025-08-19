const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, ""));
  },
});
const upload = multer({ storage });

// Create a property (auth required)
router.post("/", auth, upload.array("images", 10), async (req, res) => {
  try {
    const imagePaths = req.files
      ? req.files.map((f) => `/uploads/${f.filename}`)
      : [];
    const property = new Property({
      ...req.body,
      images: imagePaths,
      listedBy: req.user._id,
    });
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all properties
router.get("/", async (req, res) => {
  try {
    const { limit, sort, location, type, minPrice, maxPrice } = req.query;

    // Build query object
    let query = {};
    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.propertyType = type;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortObj = {};
    if (sort === "createdAt") {
      sortObj.createdAt = -1; // Most recent first
    } else if (sort === "price") {
      sortObj.price = 1; // Lowest price first
    } else if (sort === "price-desc") {
      sortObj.price = -1; // Highest price first
    }

    // Build the query
    let propertiesQuery = Property.find(query).populate("listedBy", "email");

    // Apply sorting
    if (Object.keys(sortObj).length > 0) {
      propertiesQuery = propertiesQuery.sort(sortObj);
    }

    // Apply limit
    if (limit) {
      propertiesQuery = propertiesQuery.limit(Number(limit));
    }

    const properties = await propertiesQuery;
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "listedBy",
      "email"
    );
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a property (auth required)
router.put("/:id", auth, upload.array("images", 10), async (req, res) => {
  try {
    let update = { ...req.body };
    if (req.files && req.files.length > 0) {
      update.images = req.files.map((f) => `/uploads/${f.filename}`);
    }
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, listedBy: req.user._id },
      update,
      { new: true }
    );
    if (!property)
      return res
        .status(404)
        .json({ error: "Property not found or not authorized" });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a property (auth required)
router.delete("/:id", auth, async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      listedBy: req.user._id,
    });
    if (!property)
      return res
        .status(404)
        .json({ error: "Property not found or not authorized" });
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contact form endpoint
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;
    if (!name || !email || !message || !propertyId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const property = await Property.findById(propertyId).populate("listedBy");
    if (!property) return res.status(404).json({ error: "Property not found" });
    const ownerEmail = property.listedBy.email;

    // Set up Nodemailer (Gmail config, use .env for credentials)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Set in .env
        pass: process.env.EMAIL_PASS, // Set in .env
      },
    });

    const mailOptions = {
      from: email,
      to: ownerEmail,
      subject: `Property Inquiry: ${property.title}`,
      text: `You have a new inquiry for your property "${
        property.title
      }":\n\nName: ${name}\nEmail: ${email}\nPhone: ${
        phone || "N/A"
      }\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Get dashboard statistics for a user
router.get("/stats/:userId", auth, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get total properties listed by this user
    const totalProperties = await Property.countDocuments({ listedBy: userId });

    // Get active listings (properties that are still available)
    const activeListings = await Property.countDocuments({
      listedBy: userId,
      status: { $in: ["For Sale", "For Rent"] },
    });

    // Get total views (this would need to be tracked separately, for now using a placeholder)
    // In a real app, you'd have a separate collection to track property views
    const totalViews = totalProperties * 15; // Placeholder calculation

    // Get new inquiries (this would need to be tracked separately, for now using a placeholder)
    // In a real app, you'd have a separate collection to track inquiries
    const newInquiries = Math.floor(totalProperties * 0.3); // Placeholder calculation

    res.json({
      totalProperties,
      activeListings,
      totalViews,
      newInquiries,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's properties with pagination
router.get("/user/:userId", auth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const { page = 1, limit = 10 } = req.query;

    const properties = await Property.find({ listedBy: userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("listedBy", "email name");

    const total = await Property.countDocuments({ listedBy: userId });

    res.json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
module.exports = router;
