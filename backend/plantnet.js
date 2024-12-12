const axios = require('axios');
const querystring = require('querystring');

// API Configuration
const API_URL = "https://my-api.plantnet.org/v2/identify";
const project = "all"; // Try "weurope" or "canada"
const lang = "fr";
const organs = "leaf";
const includeRelatedImages = false;
const apiKey = "2b10IffYtY7B1YTE2eMRN4rco"; // Replace with your API key

// Function to call the PlantNet API
async function identifyPlant(imageURL) {
  try {
    // URL Encoding for the image URL
    const queryParams = querystring.stringify({
      images: imageURL,
      organs: organs,
      lang: lang,
      "include-related-images": includeRelatedImages,
      "api-key": apiKey,
    });

    const apiURL = `${API_URL}/${project}?${queryParams}`;
    console.log(`Requesting: ${apiURL}`);
    
    // Send the request to the PlantNet API
    const response = await axios.get(apiURL);

    // Check the response status and return the result
    if (response.status === 200) {
      console.log("Response received successfully!");
      return response.data;  // Return the API data
    } else {
      console.error(`Unexpected status: ${response.status}`);
      throw new Error(`Unexpected status: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error(`API Error: ${error.response.status}`);
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error hitting the API:", error.message);
    }
    throw error;  // Re-throw the error to be handled by the calling function
  }
}

module.exports = { identifyPlant };
