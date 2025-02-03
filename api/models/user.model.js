  import mongoose from 'mongoose'; // Using ES Modules import syntax

  const userSchema = new mongoose.Schema(
    {
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
        default: 'user',
      },
      profilePicture: {
        type: String,
        default: '', // Can store a URL for the profile picture
      },
      location: {
        type: String,
        default: '',
      },
      issues: {
        type: [String],
        default: [], // List of issues for users (e.g., mental health, physical health, etc.)
      },
      specialization: {
        type: [String],
        default: [], // For therapists or medical professionals (e.g., psychiatry, nursing)
      },
      servicesOffered: {
        type: [String],
        default: [], // For medical professionals (e.g., nursing, wound care, injections)
      },
      availability: {
        type: [
          {
            day: String,
            slots: [String], // Time slots available for bookings
          },
        ],
        default: [], // Only applicable for therapists and medical professionals
      },
      isVerified: {
        type: Boolean,
        default: false, // Admin approval for therapists and medical professionals
      },
      experience: {
        type: Number,
        default: 0, // Years of experience for therapists/medical professionals
      },
      certifications: {
        type: [String],
        default: [], // Certifications for therapists/medical professionals
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt fields
    }
  );

  // Change from CommonJS export to ES Modules export
  export default mongoose.model('User', userSchema); // Using export default
