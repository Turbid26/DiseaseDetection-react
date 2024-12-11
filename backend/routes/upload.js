// backend/routes/uploadAndSave.js
const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinaryConfig');
const multer = require('multer');
const Upload = require('../models/upload');
const axios = require('axios');

// Configure multer
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

// Global variables to hold data temporarily
let username = '';
let imageUrl = '';
let diagnosis = '';
let accuracy = 0;

// Route for image upload and classification
router.post('/', uploadMiddleware.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Get user details from the request body
    username = req.body.username;  // Store username globally
    if (!username) {
      return res.status(400).json({ error: 'Username is required.' });
    }

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

    // Save the image URL globally
    imageUrl = result.secure_url;

    res.status(201).json({
      message: 'Image uploaded successfully.',
      upload: {
        url: imageUrl,
        username: username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/classify', async (req, res) => {
  try {
    if (!username || !imageUrl) {
      return res.status(400).json({ error: 'Username and image URL are required' });
    }

    // const leafCheckResponse = await fetch(
    //   "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
    //     {
    //       headers: {
    //         Authorization: `Bearer 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`,
    //       },
    //       method: "POST",
		// 	    body: imageUrl,
    //   }
    // );

    // console.log(leafCheckResponse);

    // Call Hugging Face API for classification
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease", 
      { inputs: imageUrl },
      {
        headers: {
          Authorization: "Bearer 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", // Your Hugging Face token
        },
      }
    );

    // Assuming Hugging Face returns results in this format: [{ label: "Disease name", score: 0.85 }]
    const classificationResults = response.data;

    if (classificationResults && Array.isArray(classificationResults) && classificationResults.length > 0) {
      diagnosis = classificationResults[0].label; // Take the first label
      accuracy = classificationResults[0].score * 100; // Accuracy percentage

      // Save diagnosis, accuracy, and image URL into the database
      const newUpload = new Upload({
        url: imageUrl,
        username: username,
        diagnosis: diagnosis,
        accuracy: accuracy,
      });

      await newUpload.save();

      // Send a response with the diagnosis and accuracy
      res.status(200).json({
        message: 'Image classified and saved successfully',
        diagnosis: diagnosis,
        accuracy: accuracy,
      });
    } else {
      res.status(400).json({ error: 'No classification results returned' });
    }

    username = '';
    imageUrl = '';
    diagnosis = '';
    accuracy = 0;

  } catch (error) {
    console.error('Error classifying image:', error);
    res.status(500).json({ error: 'Error classifying image' });
  }
});

module.exports = router;