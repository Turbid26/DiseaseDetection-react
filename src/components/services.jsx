// src/components/Services.jsx

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/services.css'; // Ensure to include the CSS file

const Services = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Stores the selected file
  const [previewImage, setPreviewImage] = useState(null); // Stores the preview URL
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Placeholder for logged-in state

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the file in state
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('You must be logged in to upload');
      return;
    }

    if (!selectedImage) {
      setMessage('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Image uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading image.');
    }
  };

  return (
    <div className="services">
      <h1>Upload an Image</h1>
      <div className="upload-box">
        {previewImage ? (
          <img src={previewImage} alt="Preview" className="preview-image" />
        ) : (
          <div className="placeholder">
            <p>Select an image</p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload Image</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Services;
