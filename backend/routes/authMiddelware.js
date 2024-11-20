const jwt = require('jsonwebtoken');
const User = require('../models/users');  // Import the User model

// Middleware to authenticate the user based on JWT token
const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header (Bearer token)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If no token is provided, send an error response
    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID (you can also add checks for other fields if needed)
    const user = await User.findOne({ _id: decoded.userId });

    // If no user is found, send an error response
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach the user object to the request to access in the next middleware or route
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // Catch any errors (e.g., token expiration, malformed token, etc.)
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
