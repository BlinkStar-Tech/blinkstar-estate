const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Do not log tokens or noisy auth info
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    // No debug logging here to avoid noise
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    // Handle token-specific errors with concise responses and minimal logging noise
    if (err && err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (err && (err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError')) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Silent for unexpected JWT errors; centralized error handler can log if needed
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 