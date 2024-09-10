// backend/routes/upload.js

const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinaryConfig');
const multer = require('multer');
const Upload = require('../models/upload'); 

// Configure multer
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

// Route for image upload
router.post('/', uploadMiddleware.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const username = req.body.username || 'guestUser';
    const diagnosis = req.body.diagnosis || 'Unidentified';
    const accuracy = req.body.accuracy || 0;

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
    const newUpload = new Upload({
      url: result.secure_url,
      username: username, 
      diagnosis: diagnosis,
      accuracy: accuracy
    });
    await newUpload.save();

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
