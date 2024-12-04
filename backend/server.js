const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoute = require('./routes/contact');
const uploadRoute = require('./routes/upload');
const authRoute = require('./routes/auth');
const historyRoute = require('./routes/history');
const passwordRoute = require('./routes/password');
const blogRoute = require('./routes/blog');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// API Routes
app.use('/api/contact', contactRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/auth', authRoute);
app.use('/api/history', historyRoute);
app.use('/api/password', passwordRoute);
app.use('/api/blog', blogRoute)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Catch-all handler for any requests that don't match the API routes
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();  // Pass control to the next middleware (API routes)
  }
  res.sendFile(path.join(__dirname, '../build', 'index.html')); // Serve React's index.html for non-API requests
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
