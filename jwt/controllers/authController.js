// controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message:
          'Please provide all required fields: username, email, and password.',
      });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User with this email or username already exists.' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
        message: 'User registered successfully.',
      });
    } else {
      res.status(400).json({ message: 'Invalid user data.' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({
      message: 'Server error during registration.',
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide email/username and password.' });
    }

    // Find user by email or username, and explicitly select the password field
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() },
      ],
    }).select('+password');

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
        message: 'User logged in successfully.',
      });
    } else {
      res.status(401).json({ message: 'Invalid email/username or password.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res
      .status(500)
      .json({ message: 'Server error during login.', error: error.message });
  }
};
