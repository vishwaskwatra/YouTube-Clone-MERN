import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

// Function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const hashedPassword = await argon2.hash(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // If user creation is successful, return the user info along with a token
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id), // Generate token using user ID
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await argon2.verify(user.password, password))) {
      res.json({
        _id: user._id, // Return user ID
        username: user.username,
        email: user.email,
        token: generateToken(user._id), // Generate token using user ID
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
