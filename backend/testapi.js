const axios = require('axios');
const querystring = require('querystring');

// API Configuration
const API_URL = "https://my-api.plantnet.org/v2/identify";
const project = "all"; // Try "weurope" or "canada"
const imageURL = "https://res.cloudinary.com/duhho2j3z/image/upload/v1733837986/your_folder_name/irp9y6s5ld2blsdv6z4q.jpg"; // Replace with a valid JPG image URL
const lang = "fr";
const organs = "leaf";
const includeRelatedImages = false;
const apiKey = "2b10IffYtY7B1YTE2eMRN4rco"; // Replace with your API key

// URL Encoding for the image URL

// Construct the API URL
const queryParams = querystring.stringify({
  images: imageURL,
  organs: organs,
  lang: lang,
  "include-related-images": includeRelatedImages,
  "api-key": apiKey,
});

const apiURL = `${API_URL}/${project}?${queryParams}`;
async function identifyPlant() {
// Function to call the APIasync function identifyPlant() {
  try {
    console.log(`Requesting: ${apiURL}`);
    
    // Send the request
    const response = await axios.get(apiURL);

    // Check response status
    if (response.status === 200) {
      console.log("Response received successfully!");
      console.log("Prediction:", response.data);
    } else {
      console.error(`Unexpected status: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error(`API Error: ${error.response.status}`);
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error hitting the API:", error.message);
    }
  }
}

identifyPlant();