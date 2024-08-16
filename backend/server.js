const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoute = require('./routes/contact');
const uploadRoute = require('./routes/upload');
const authRoute = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({origin: 'http://localhost:5001'}));

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
app.use('/api/auth',authRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler for any requests that don't match the API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
