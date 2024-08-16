// backend/models/image.js
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  username: { type: String, required: true }, // Add username field
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
