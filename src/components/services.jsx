import React, { useState } from 'react';
import axios from 'axios';
import '../styles/services.css'

const Services = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [classificationResult, setClassificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Search variables
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle image upload and classification
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
      // Step 1: Upload the image to the backend
      const uploadResponse = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Extract image URL and username from the response
      const { url: imageUrl, username } = uploadResponse.data.upload;
  
      setMessage('Image uploaded successfully!');
      console.log('Uploaded Image URL:', imageUrl);
  
      // Step 2: Classify the image using the /classify route
      classifyImage(imageUrl, username);  // Pass the image URL and username
  
    } catch (error) {
      setMessage('Error uploading image.');
      console.error('Upload error:', error);
    }
  };
  
  // Classify the image by calling the /classify route
  const classifyImage = async (imageUrl, username) => {
    try {
      console.log("Classifying image:", imageUrl);
  
      // Step 3: Send the image URL to the /classify route to get diagnosis and accuracy
      const classifyResponse = await axios.post('/api/upload/classify', { imageUrl, username });
  
      // Get the classification result (diagnosis and accuracy)
      const { diagnosis, accuracy } = classifyResponse.data;
  
      setClassificationResult({ diagnosis, accuracy });
      setIsLoading(false);
      setMessage('Image classified successfully!');
  
    } catch (error) {
      setMessage('Error classifying image.');
      console.error('Classification error:', error);
      setIsLoading(false);
    }
  };

  // Handle search query
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResult(null);
      return;
    }
  
    setSearchLoading(true);
    try {
      // Use the Wikipedia REST API with the endpoint `page/summary/{topic}`
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`, {
        params: {
          origin: '*' // Allow cross-origin requests (CORS)
        },
      });
  
      if (response.data && response.data.title && response.data.extract) {
        setSearchResult(response.data.extract);
      } else {
        setSearchResult('No results found or invalid disease name.');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResult('Error fetching search results.');
    } finally {
      setSearchLoading(false);
    }
  };

  // Format and render classification results
  const renderClassificationResults = () => {
    if (!classificationResult) return null;
  
    return (
      <div>
        <p>Disease: {classificationResult.diagnosis}</p>
        <p>Accuracy: {classificationResult.accuracy.toFixed(2)}%</p>
      </div>
    );
  };

  return (
    <div className="services-container">
      {/* Card 1 - Diagnose Plant */}
      <div className="card">
        <div className="content">
          <h2>Diagnose Your Plant</h2>
          <p>Upload an image of your plant to diagnose potential diseases.</p>
          <div className="upload-box">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="preview-image" />
            ) : (
              <div className="placeholder">Select an image</div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload and Classify</button>
          </div>
          {isLoading && <p>Classifying image...</p>}
          <p>{message}</p>
          <div>{renderClassificationResults()}</div>
        </div>
      </div>

      {/* Card 2 - Search Diseases */}
      <div className="card">
        <div className="content">
          <h2>Search for Plant Diseases</h2>
          <p>Search for a plant disease to get a summary from Wikipedia.</p>
          <input
            type="text"
            placeholder="Enter disease name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          {searchLoading && <p>Loading...</p>}
          {searchResult && <div className="search-result">{searchResult}</div>}
        </div>
      </div>
    </div>
  );
};

export default Services;
