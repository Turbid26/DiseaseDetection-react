import React, { useState } from 'react';
import axios from 'axios';
import '../styles/services.css'; // Ensure to include the CSS file

const Services = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      await axios.post('/api/upload', formData, {
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
        {selectedImage ? (
          <img src={selectedImage} alt="Preview" className="preview-image" />
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
