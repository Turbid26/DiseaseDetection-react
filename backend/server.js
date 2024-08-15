require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Contact = require('./models/contact'); // Import your Contact model
const User = require('./models/users');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const uri = process.env.MONGODB_URI || 'mongodb+srv://raghuram2432006:EFmdhacZuFY9eWzx@cluster0.fwyro.mongodb.net/?retryWrites=true&w=majority&appName=cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
