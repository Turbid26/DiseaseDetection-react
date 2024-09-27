const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/users');  // Assuming you have a User model
const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',  // Use your email service
  auth: {
    user: process.env.EMAIL_USER,  // Email address
    pass: process.env.EMAIL_PASS,  // Email password or App-specific password
  },
});

// Route: Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Generate a reset token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = Date.now() + 3600000;  // Token expires in 1 hour

    // Update the user with reset token and expiration
    user.resetToken = token;
    user.resetTokenExpiration = tokenExpiration;
    await user.save();

    // Send email with reset link
    const resetLink = `http://your-frontend-domain.com/reset-password?token=${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click this <a href="${resetLink}">link</a> to reset your password. The link is valid for 1 hour.</p>`,
    });

    res.status(200).send('Password reset link sent to your email');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending reset link');
  }
});

// Route: Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },  // Ensure token is still valid
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    // Hash the new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).send('Password has been reset');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error resetting password');
  }
});


module.exports = router;
