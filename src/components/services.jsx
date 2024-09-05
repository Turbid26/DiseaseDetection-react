import React, { useState } from 'react';
import axios from 'axios';

const Services = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Stores the selected file
  const [previewImage, setPreviewImage] = useState(null); // Stores the preview URL
  const [message, setMessage] = useState('');
  const [isLoggedIn] = useState(true); // Placeholder for logged-in state

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
      console.error('Upload error:', error.response ? error.response.data : error.message);
    }
  };

  // Styles as a JavaScript object
  const styles = {
    services: {
      backgroundColor: 'white',
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
    },
    heading: {
      fontSize: '32px',
      marginBottom: '20px',
      color: '#333',
    },
    uploadBox: {
      border: '2px dashed grey',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      position: 'relative',
      display: 'inline-block',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
      overflow: 'hidden',
    },
    placeholder: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      backgroundColor: '#eaeaea',
    },
    previewImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '10px',
    },
    input: {
      display: 'block',
      margin: '20px auto',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    message: {
      fontSize: '16px',
      color: '#333',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.services}>
      <h1 style={styles.heading}>Upload an Image</h1>
      <div style={styles.uploadBox}>
        {previewImage ? (
          <img src={previewImage} alt="Preview" style={styles.previewImage} />
        ) : (
          <div style={styles.placeholder}>
            <p>Select an image</p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} />
        <button onClick={handleUpload} style={styles.button}>Upload Image</button>
      </div>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

export default Services;
