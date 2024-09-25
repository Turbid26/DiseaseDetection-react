const express = require('express');
const router = express.Router();
const Upload = require('../models/upload');  // Import Diagnosis model

// GET route to fetch all diagnosis history
router.get('/', async (req, res) => {
    try {
        const history = await Upload.find();  // Fetch all diagnosis records
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching history' });
    }
});

module.exports = router;
