import Therapist from '../models/therapist.model.js'; // Therapist model
import jwt from 'jsonwebtoken'; // Import jwt to verify token
import User from '../models/user.model.js'; // User model

// Middleware to verify the token and extract userId
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.userId = decoded.id; // Attach userId to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export const registerTherapist = async (req, res) => {
  try {
    const { specialization, licenseNumber, experience, certifications } = req.body;

    // Profile photo is optional
    const profilePhoto = req.file ? req.file.path : null;

    // Ensure authenticated user exists
    if (!req.userId) {
      return res.status(400).json({ message: 'User not authenticated.' });
    }

    // Find the user by the token userId
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Check if the user is already registered as a therapist
    const existingTherapist = await Therapist.findOne({ userId: req.userId });
    if (existingTherapist) {
      return res.status(400).json({ message: 'User is already registered as a therapist.' });
    }

    // Create new therapist profile and associate with the user
    const therapist = new Therapist({
      userId: user._id, // Use userId from the authenticated user
      specialization,
      licenseNumber,
      experience,
      certifications,
      profilePhoto,
      role: 'therapist', // Explicitly set role to "therapist"
    });

    await therapist.save();
    res.status(201).json({ message: 'Therapist profile created successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to create therapist profile.', error: error.message });
  }
};
