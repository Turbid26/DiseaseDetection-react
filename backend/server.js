const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the Contact model
const Contact = require('./models/contact');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const uri = 'mongodb+srv://raghuram2432006:EFmdhacZuFY9eWzx@cluster0.fwyro.mongodb.net/?retryWrites=true&w=majority&appName=cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Route to handle form submissions
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
        console.error('Error saving form:', err);
        res.status(400).send('Error saving form');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
