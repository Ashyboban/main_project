import express from 'express';
import { signup } from '../controllers/Auth.controller.js';  // Ensure proper import

const authRoutes = express.Router();

// Route for user signup
authRoutes.post('/signup', signup);

// Export the router
export default authRoutes;  // Correct ES Module export
