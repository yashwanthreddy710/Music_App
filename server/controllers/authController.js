const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER CONTROLLER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Always store and search email in lowercase
    const emailLower = email.toLowerCase();

    let user = await User.findOne({ email: emailLower });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email: emailLower,
      password: hashedPassword,
    });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.json({
      msg: 'User Registered Successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const emailLower = email.trim().toLowerCase();
      console.log("Login Attempt:", emailLower, password);
  
      // Find the user by email
      const user = await User.findOne({ email: emailLower });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check password match
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate token
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
  
      // Return response
      res.json({
        msg: 'Login Successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
