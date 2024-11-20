const express = require('express');
const router = express.Router();
const Upload = require('../models/upload'); // Import the Upload model
const authMiddleware = require('../routes/authMiddelware'); // Import auth middleware

// Get upload history for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Get the username from the authenticated user
    const username = req.user.username;

    // Find all uploads associated with the user's username, sorted by most recent
    const uploads = await Upload.find({ username }).sort({ uploadedAt: -1 });

    if (!uploads.length) {
      return res.status(404).json({ message: 'No uploads found for this user.' });
    }

    // Respond with the uploads
    res.status(200).json(uploads);
  } catch (error) {
    console.error('Error fetching upload history:', error);
    res.status(500).json({ message: 'Error retrieving upload history.' });
  }
});

module.exports = router;
