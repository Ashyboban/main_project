import express from "express";
import multer from "multer";
import { registerTherapist } from "../controllers/therapist.controller.js";
import verifyToken from "../middleware/verifyToken.js"; // Include the middleware for token verification

const therapistRoutes = express.Router();

// Define multer storage with dynamic filename handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'api/uploads/'); // Point to the correct directory
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}-${sanitizedFilename}`);
  },
});

// Allow only certain image file types (e.g., jpg, png)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only image files are allowed."));
  }
};

const upload = multer({ storage, fileFilter });

// Route for therapist registration with photo upload, and authenticate middleware
therapistRoutes.post('/register', verifyToken, upload.single('profilePhoto'), registerTherapist);

export default therapistRoutes;
