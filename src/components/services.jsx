import React, { useState } from 'react';
import axios from 'axios';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference('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');

const Services = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [classificationResult, setClassificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setMessage('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('username', localStorage.getItem('username'));

    try {
      setIsLoading(true);
      const response = await axios.post('./api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.url;

      setMessage('Image uploaded successfully!');

      // Call Hugging Face API for classification
      classifyImage(imageUrl);

    } catch (error) {
      setMessage('Error uploading image.');
      console.error('Upload error:', error.response ? error.response.data : error.message);
    }
  };

  // Classify image using Hugging Face Inference API
  const classifyImage = async (imageUrl) => {
    try {
      const result = await hf.imageClassification({
        data: imageUrl,  // Use the URL of the uploaded image
        model: 'nickmuchi/yolos-small-plant-disease-detection'
      });

      // Set the classification result from the Hugging Face API response
      setClassificationResult(result);
      setIsLoading(false);

    } catch (error) {
      setMessage('Error classifying image.');
      console.error('Classification error:', error.response ? error.response.data : error.message);
      setIsLoading(false);
    }
  };

  // Format and render classification results
  const renderClassificationResults = () => {
    if (!classificationResult || !Array.isArray(classificationResult)) return null;
  
    return classificationResult.map((result, index) => (
      <div key={index}>
        <p>Disease: {result.label}</p>
        <p>Accuracy: {result.score.toFixed(2)*100}%</p>
      </div>
    ));
  };
  

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
    message: {
      fontSize: '16px',
      color: '#333',
      marginTop: '20px',
    },
    classificationResult: {
      fontSize: '18px',
      color: '#4CAF50',
      marginTop: '20px',
    },
    loading: {
      fontSize: '18px',
      color: '#FF5733',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.services}>
      <h1 style={styles.heading}>Classify an Image</h1>
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

      {/* Loading Spinner or Message */}
      {isLoading && <p style={styles.loading}>Classifying image...</p>}

      {/* Display the classification result */}
      <div>{renderClassificationResults()}</div>
    </div>
  );
};

export default Services;
