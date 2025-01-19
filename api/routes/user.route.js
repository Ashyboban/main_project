import express from 'express';
import { signup } from '../controllers/user.controller.js';  // Ensure proper import

const userRoutes = express.Router();

// Signup route
userRoutes.post('/signup', signup);

// Export the router
export default userRoutes;  // Correct ES Module export
