const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');  // Assuming you have a User model
const router = express.Router();



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