import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message:
          'Please provide all require fields: username, email and password.',
      });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({
        message: 'User with this email or username already exists',
      });
    }

    // Saved new user to database
    const newUser = await User.create({
      username,
      email,
      password,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        message: 'User registered successfully',
      });
    } else {
      res.status(400).json({
        message: 'Invalid user data',
      });
    }
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({
      message: 'Server is error during registration',
      error: error?.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide all require fileds: email, password',
      });
    }

    const existUser = await User.findOne({ email }).select('+password');

    if (existUser && (await existUser.comparePassword(password))) {
      const accessToken = jwt.sign(
        // payload
        {
          id: existUser.id,
          username: existUser.username,
        },
        // secret key
        process.env.JWT_SECRET_KEY,

        // expire time
        {
          expiresIn: process.env.JWT_EXPIRE_TIME,
        }
      );

      return res.json({
        _id: existUser.id,
        username: existUser.username,
        email: existUser.email,
        accessToken,
      });
    } else {
      res.json({
        message: 'Invalid user data',
      });
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      message: 'Server is error during login',
      error: error?.message,
    });
  }
};

const AuthController = {
  registerUser,
  loginUser,
};

export default AuthController;
