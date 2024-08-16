// backend/routes/upload.js
const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinaryConfig');
const multer = require('multer');
const Upload = require('../models/upload');

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to simulate user authentication
const authenticateUser = (req, res, next) => {
  // Replace this with your actual authentication logic
  req.user = { username: 'sampleUser' }; // Example user object
  next();
};

// Route for image upload
router.post('/upload', authenticateUser, upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        resource_type: 'image',
        folder: 'your_folder_name',
      }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }).end(req.file.buffer);
    });

    // Save image URL and username to MongoDB
    const upload = new Upload({
      url: result.secure_url,
      username: req.user.username,
    });
    await upload.save();

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
