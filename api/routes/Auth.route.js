import express from 'express';
import { signup, signin } from '../controllers/Auth.controller.js'; // Ensure proper import

const authRoutes = express.Router();

// Route for user signup
authRoutes.post('/signup', signup);

// Route for user signin
authRoutes.post('/signin', signin);

// Export the router
export default authRoutes; // Correct ES Module export
