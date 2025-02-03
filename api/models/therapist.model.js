import mongoose from 'mongoose'; // Using ES Modules import syntax

const therapistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },  // Add this line

  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'therapist', 'admin', 'medical_professional'],
  },
  specialization: { type: String },
  licenseNumber: { type: String },
  experience: { type: Number },
  certifications: { type: String },
  profilePhoto: { type: String },
});

export default mongoose.model('Therapist', therapistSchema); // Using export default
