require('dotenv').config();
const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinaryConfig');
const multer = require('multer');
const Upload = require('../models/upload');
const axios = require('axios');
const { identifyPlant } = require('../plantnet'); 

// Configure multer
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

let username = '';
let imageUrl = '';
let diagnosis = '';
let accuracy = 0;

// Route for image upload and leaf detection
router.post('/', uploadMiddleware.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    username = req.body.username;
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

    const withTimeout = (promise, timeoutMs) => {
      let timeout;

      const timeoutPromise = new Promise((_, reject) =>
        timeout = setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
      );
      return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeout));
    };

    try
    {
      const leafres = await withTimeout(
        await identifyPlant(imageUrl), 10000);
        console.log(leafres);
    }
    catch (error)
    {
      console.error('Error classifying image:', error);
      return res.status(500).json({ error: error.response?.data || 'Please upload well lit image of a leaf.' });
    }

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease',
      { inputs: imageUrl },
      {
        headers: {
          Authorization: `Bearer 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`, // Use API key from environment
        },
      }
    );

    const classificationResults = response.data;

    if (classificationResults && Array.isArray(classificationResults) && classificationResults.length > 0) {
      diagnosis = classificationResults[0].label;
      accuracy = classificationResults[0].score * 100;

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
    res.status(500).json({ error: error.response?.data || 'Please try again in about 20 seconds.' });
  }
  finally
  {
    username = '';
    imageUrl = '';
    diagnosis = '';
    accuracy = 0;
  }
});

module.exports = router;
