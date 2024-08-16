const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import your Contact model

// Route to handle contact form submission
router.post('/submit', async (req, res) => {
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
        console.error('Error:', err); // Log error for debugging
        res.status(400).send('Error saving form');
    }
});

module.exports = router;
