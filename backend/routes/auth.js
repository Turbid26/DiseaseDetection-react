const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { email, firstName, lastName, username, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Validate the input fields directly from req.body
    if (!username.trim()) {
      return res.status(400).json({ msg: 'Username is blank' });
    }
    if (!password.trim()) {
      return res.status(400).json({ msg: 'Password is blank' });
    }
    if (!firstName.trim()) {
      return res.status(400).json({ msg: 'First name is blank' });
    }
    if (!lastName.trim()) {
      return res.status(400).json({ msg: 'Last name is blank' });
    }

    // Create a new user
    user = new User({
      email,
      firstName,
      lastName,
      username,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a JWT token with user information (excluding password)
    // const payload = {
    //   userId: user._id,
    //   username: user.username,
    // };

    // // Generate token (expires in 1 hour)
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ msg: 'Login successful', username});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
