require('dotenv').config();
const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinaryConfig');
const multer = require('multer');
const Upload = require('../models/upload');
const axios = require('axios');
const { identifyPlant } = require('./plantNet'); 

// Configure multer
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

// Route for image upload and leaf detection
router.post('/', uploadMiddleware.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const username = req.body.username?.trim();
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

    const imageUrl = result.secure_url;

    const leafres = await identifyPlant(imageURL);
    console.log(leafres);

    

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.response?.data || 'Internal Server Error' });
  }
});

// Route for classification
router.post('/classify', async (req, res) => {
  try {
    const { username, imageUrl } = req.body;
    if (!username || !imageUrl) {
      return res.status(400).json({ error: 'Username and image URL are required' });
    }

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease',
      { inputs: imageUrl },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`, // Use API key from environment
        },
      }
    );

    const classificationResults = response.data;

    if (classificationResults && Array.isArray(classificationResults) && classificationResults.length > 0) {
      const diagnosis = classificationResults[0].label;
      const accuracy = classificationResults[0].score * 100;

      const newUpload = new Upload({
        url: imageUrl,
        username,
        diagnosis,
        accuracy,
      });

      await newUpload.save();

      res.status(200).json({
        message: 'Image classified and saved successfully',
        diagnosis,
        accuracy,
      });
    } else {
      res.status(400).json({ error: 'No classification results returned' });
    }
  } catch (error) {
    console.error('Error classifying image:', error);
    res.status(500).json({ error: error.response?.data || 'Error classifying image' });
  }
});

module.exports = router;
