const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/User");
const UserProfile = require("../Models/UserProfile"); // Correct import statement

const SECRET_KEY = "YOUR_SECRET_KEY"; // Use env variables for security

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "⚠ Please fill all required fields" });
    }

    // Check if username already exists in UserProfile
    const existingProfile = await UserProfile.findOne({ username });
    if (existingProfile) {
      return res.status(400).json({ message: "⚠ Username already in use" });
    }

    // Check if user already exists in User collection
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "⚠ Email or Username already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone: phone || "", // Make phone optional
    });

    await newUser.save();

    // Create user profile linked to userId
    const userProfile = new UserProfile({
      userId: newUser._id,  // Link profile to userId
      username,
      email,
      phone: phone || "", // Make phone optional
      profilePhoto: "", // Can be updated later
      gender: "",
      address: "",
      age: "",
    });

    await userProfile.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "⚠ Server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "⚠ Please fill all fields" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "⚠ Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "⚠ Invalid credentials" });
    }

    // Fetch user profile using userId
    const userProfile = await UserProfile.findOne({ userId: user._id });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        phone: userProfile ? userProfile.phone : "",
        profilePhoto: userProfile ? userProfile.profilePhoto : "",
        gender: userProfile ? userProfile.gender : "",
        address: userProfile ? userProfile.address : "",
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "⚠ Server error" });
  }
};

module.exports = { registerUser, loginUser };