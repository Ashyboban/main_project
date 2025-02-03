import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TherapistRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    specialization: "",
    licenseNumber: "",
    experience: "",
    certifications: "",
    profilePhoto: null,
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change (profile photo)
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send (including the profile photo)
    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    // Get the token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      // Make POST request to register therapist
      const response = await axios.post(
        "http://localhost:3000/api/therapist/register", // Adjust URL as needed
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`, // Include token in the header
          },
        }
      );

      alert(response.data.message);
      navigate("/therapist/dashboard"); // Redirect to therapist dashboard after successful registration
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Complete Your Therapist Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Experience (in years)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Certifications</label>
          <textarea
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TherapistRegistration;
