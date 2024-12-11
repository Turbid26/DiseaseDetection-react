const express = require('express');
const router = express.Router();
const Upload = require('../models/upload');

// Fetch history for the logged-in user
router.post('/', async (req, res) => {
  try {
    const username = req.headers['authorization'];

    if (!username) {
      return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    }

    const uploads = await Upload.find({ username }).sort({ uploadedAt: -1 });

    if (!uploads.length) {
      return res.status(404).json({ message: 'No uploads found for this user.' });
    }

    res.status(200).json(uploads);
  } catch (error) {
    console.error('Error fetching user history:', error);
    res.status(500).json({ message: 'Internal server error while retrieving history.' });
  }
});

module.exports = router;
