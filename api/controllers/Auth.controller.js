import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWT
import User from '../models/user.model.js'; // User model
import Therapist from '../models/therapist.model.js'; // Import the Therapist model

import dotenv from 'dotenv'; // To load environment variables

dotenv.config(); // Load environment variables from .env file

const { JWT_SECRET } = process.env; // Get JWT_SECRET from environment variables

// Signup function
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body; // Role is passed from the frontend
  console.log(role);

  try {
    // Check if a user with the same email already exists in both User and Therapist collections
    let existingUser;
    if (role === 'therapist') {
      existingUser = await Therapist.findOne({ email });
    } else {
      existingUser = await User.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    // If the user is a therapist, create a new therapist object
    if (role === 'therapist') {
      newUser = new Therapist({
        name,
        email,
        password: hashedPassword,
        role: 'therapist', 
      });

      // Save the therapist first
      await newUser.save();

      // Now assign the userId after saving
      newUser.userId = newUser._id;
      await newUser.save(); // Save again to update the userId field
    } else {
      // If the user is not a therapist, create a new user object
      newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'user', // Ensure user role is set
      });
      await newUser.save();
    }

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });

    // Redirect based on role
    if (role === 'therapist') {
      return res.status(201).json({
        message: 'Signup successful, please complete your therapist profile.',
        token,
        redirectUrl: '/therapist/register', // Redirect to therapist registration page
      });
    } else {
      return res.status(201).json({
        message: 'User registered successfully',
        token,
        redirectUrl: '/user/dashboard', // Redirect to user dashboard (or any page for the user)
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error: error.message });
  }
};

// Signin function
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists (it will check both User and Therapist collections)
    const user = await User.findOne({ email }) || await Therapist.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password!' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    // Send response with the token and user details
    res.status(200).json({
      message: 'Sign in successful!',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};
