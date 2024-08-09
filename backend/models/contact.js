const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    phone: String,
    subject: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
