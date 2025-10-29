// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/auth");
// const propertyRoutes = require("./routes/property");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // Detailed error logging
// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// // Connect to MongoDB with detailed error logging
// mongoose
//   .connect(
//     process.env.MONGO_URI ||
//       "mongodb+srv://blinkstardesigns:blinkstardesigns@cluster0.hked8ma.mongodb.net/",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("Connected to MongoDB successfully"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// // Test route
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Server is working!" });
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/property", propertyRoutes);
// app.use("/api/users", require("./routes/users"));
// app.use("/api/messages", require("./routes/message"));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Error details:", err);
//   console.error("Stack trace:", err.stack);
//   res.status(500).json({
//     message: "Something went wrong!",
//     error:
//       process.env.NODE_ENV === "development"
//         ? err.message
//         : "Internal server error",
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

/////////////////////////////////////////////////////////////////

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path"); // ← Added: needed to serve React build

// dotenv.config();

// const app = express();

// // Middleware
// const allowedOrigins = [
//   process.env.FRONTEND_URL,
//   process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
//   process.env.RENDER_FRONTEND_URL,
//   process.env.NODE_ENV !== "production" && "http://localhost:3000",
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // Detailed error logging
// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// // Connect to MongoDB
// mongoose
//   .connect(
//     process.env.MONGO_URI ||
//       "mongodb+srv://blinkstardesigns:blinkstardesigns@cluster0.hked8ma.mongodb.net/blinkstar-estate?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("Connected to MongoDB successfully"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// // Test route
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Server is working!" });
// });

// // Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/property", require("./routes/property"));
// app.use("/api/users", require("./routes/users"));
// app.use("/api/messages", require("./routes/message"));

// // Serve React frontend in production
// if (process.env.NODE_ENV === "production") {
//   const buildPath = path.join(__dirname, "../frontend", "build");
//   app.use(express.static(buildPath));
//   console.log("Serving static files from:", buildPath);

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(buildPath, "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send(
//       "Backend is running. Visit /api/test or deploy frontend for production."
//     );
//   });
// }

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Error details:", err);
//   console.error("Stack trace:", err.stack);
//   res.status(500).json({
//     message: "Something went wrong!",
//     error:
//       process.env.NODE_ENV === "development"
//         ? err.message
//         : "Internal server error",
//   });
// });

// // Use PORT provided by Render or fallback to 5000
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

////////////////////////////////////////////////////////////////////////

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// Remove path import since we're not serving static files
// const path = require("path");

dotenv.config();

const app = express();

// Middleware - Simplify CORS for now
app.use(
  cors({
    origin: true, // Allow all origins temporarily
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection (your existing code is fine)
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://blinkstardesigns:blinkstardesigns@cluster0.hked8ma.mongodb.net/blinkstar-estate?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Health check route (important for Render)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Blinkstar Estate API",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/property", require("./routes/property"));
app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/message"));

// REMOVE THIS ENTIRE SECTION - No React static file serving
// if (process.env.NODE_ENV === "production") {
//   const buildPath = path.join(__dirname, "../frontend", "build");
//   app.use(express.static(buildPath));
//   console.log("Serving static files from:", buildPath);

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(buildPath, "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send(
//       "Backend is running. Visit /api/test or deploy frontend for production."
//     );
//   });
// }

// Simple root route instead
app.get("/", (req, res) => {
  res.json({
    message: "Blinkstar Estate Backend API",
    endpoints: {
      test: "/api/test",
      health: "/health",
      auth: "/api/auth",
      properties: "/api/property",
      users: "/api/users",
    },
    frontend: "Deployed separately on Vercel",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error details:", err);
  console.error("Stack trace:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
