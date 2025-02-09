const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./Routes/authRoutes');
const profileRoutes = require('./Routes/profileRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies automatically
app.use(cors()); // Enable cross-origin resource sharing (CORS)

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/profile', profileRoutes); // Profile routes

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "⚠ Route not found!" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);  // Log the error for debugging
  res.status(500).json({ message: "⚠ Server error!" });
});

// Define server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});