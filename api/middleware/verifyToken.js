import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Ensure this is correct
import Therapist from '../models/therapist.model.js'; // Ensure this is correct

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);  // Log the decoded token to check the userId

    // Check for user or therapist based on the role in the token
    let user;
    if (decoded.role === 'therapist') {
      user = await Therapist.findById(decoded.id); // For therapist role
    } else {
      user = await User.findById(decoded.id); // For user role
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.userId = user._id; // Pass the userId to the request object
    req.userRole = decoded.role; // You can also pass role to request if needed
    next(); // Proceed to the next middleware/handler
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
