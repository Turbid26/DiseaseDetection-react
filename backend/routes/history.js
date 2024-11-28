const express = require('express');
const router = express.Router();
const Upload = require('../models/upload'); // Import the Upload model


// Get upload history for the logged-in user
router.post('/history', async (req, res) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'please log in to view history' });
    }

    const uploads = await Upload.find({ username }).sort({ uploadedAt: -1 });

    if (!uploads.length) {
      return res.status(404).json({ message: 'No uploads found for this user.' });
    }

    // Respond with the uploads
    res.status(200).json(uploads);
  }
   catch (error) {
    console.error('Error fetching upload history:', error);
    res.status(500).json({ message: 'Error retrieving upload history.' });
  }
});

module.exports = router;
