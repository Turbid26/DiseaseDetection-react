const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/contact'); // Import your Contact model
const User = require('./models/users');

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON request bodies

// MongoDB Atlas Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Route to handle form submission
app.post('/submit-contact-form', async (req, res) => {
    const { full_name, email, phone, subject, message } = req.body;

    const newContact = new Contact({
        full_name,
        email,
        phone,
        subject,
        message
    });

    try {
        await newContact.save();
        res.status(200).send('Form submitted successfully');
    } catch (err) {
        res.status(400).send('Error saving form');
    }
});

app.use('/api/auth', require('./routes/auth'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
