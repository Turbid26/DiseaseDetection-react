const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "duhho2j3z",
  api_key: "379375491312472",
  api_secret: "GyL_L3BGlKNXMtMyV_ciSvioftU",
});

async function uploadImage() {
  try {
    const image = 'C:/Users/Raghu/Downloads/test-img.jpg'; // Remove unnecessary quotes
    const result = await cloudinary.uploader.upload(image);
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// Call the function (for testing purposes)
//uploadImage();

// Uncomment the following line if you intend to use cloudinary config elsewhere
module.exports = cloudinary;
