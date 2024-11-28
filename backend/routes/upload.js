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

    // Get user details from authMiddleware
    const username = req.user.username; // Extract username from authenticated user
    const diagnosis = req.body.diagnosis || 'Unidentified';
    const accuracy = req.body.accuracy || 0;

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'your_folder_name', // Replace with your Cloudinary folder name
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(req.file.buffer);
    });

    // Save image URL and user details to MongoDB
    const newUpload = new Upload({
      url: result.secure_url,
      username: username, // Save the username of the authenticated user
      diagnosis: diagnosis,
      accuracy: accuracy,
    });
    await newUpload.save();

    res.status(201).json({
      message: 'Upload successful',
      upload: {
        url: result.secure_url,
        username: username,
        diagnosis: diagnosis,
        accuracy: accuracy,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
