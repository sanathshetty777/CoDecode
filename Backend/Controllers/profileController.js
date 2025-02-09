const jwt = require("jsonwebtoken");
const UserProfile = require("../models/UserProfile");

const SECRET_KEY = "YOUR_SECRET_KEY";

const createProfile = async (req, res) => {
  try {
    const { userId, username, email, phone, gender, address, profilePicture } = req.body;

    // // Check if a profile already exists for the userId
    // const existingProfile = await UserProfile.findOne({ userId });
    // if (existingProfile) {
    //   return res.status(400).json({ message: "⚠ Profile already exists for this user" });
    // }

    // Create a new profile
    const newProfile = new UserProfile({
      userId,
      username,
      email,
      phone,
      gender,
      address,
      profilePicture,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Profile Creation Error:", error);
    res.status(500).json({ message: "⚠ Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "⚠ No token provided" });
    }

    // Verify the token and extract the userId
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    // Fetch the profile using the userId
    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "⚠ Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: "⚠ Server error" });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, phone, gender, address, profilePicture } = req.body;

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { username, email, phone, gender, address, profilePicture },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "⚠ Profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "⚠ Server error" });
  }
};

// Delete Profile
const deleteProfile = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "⚠ No token provided" });
    }

    // Verify the token and extract the userId
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    // Delete the profile using the userId
    const deletedProfile = await UserProfile.findOneAndDelete({ userId });

    if (!deletedProfile) {
      return res.status(404).json({ message: "⚠ Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Profile Delete Error:", error);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "⚠ Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "⚠ Token expired" });
    }

    res.status(500).json({ message: "⚠ Server error" });
  }
};

module.exports = { createProfile, getProfile, updateProfile, deleteProfile };