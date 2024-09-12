const express = require('express');
const router = express.Router();
const Diagnosis = require('../models/upload');  // Import Diagnosis model

// GET route to fetch all diagnosis history
router.get('/', async (req, res) => {
    try {
        const history = await Diagnosis.find();  // Fetch all diagnosis records
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching history' });
    }
});

module.exports = router;
