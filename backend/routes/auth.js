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


    let str = User.username.trim();
    if(str.length===0){
      return res.status(400).json({ msg: 'Username is blank' });
    }
    str = User.password.trim();
    if(str.length===0){
      return res.status(400).json({ msg: 'Password is blank' });
    }
    str = User.firstName.trim();
    if(str.length===0){
      return res.status(400).json({ msg: 'First_name is blank' });
    }
    str = User.lastName.trim();
    if(str.length===0){
      return res.status(400).json({ msg: 'Last_name is blank' });
    }
    user = new User({
      email,
      firstName,
      lastName,
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

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

    res.json({ msg: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
