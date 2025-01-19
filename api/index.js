import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/Auth.route.js';  // Correct import for ES Modules
import userRoutes from './routes/user.route.js';  // Correct import for ES Modules

// Configure environment variables
dotenv.config();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Create Express app instance
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes for authentication and user management
app.use('/api/auth', authRoutes);  // Use auth routes for /api/auth
app.use('/api/users', userRoutes); // Use user routes for /api/users

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
