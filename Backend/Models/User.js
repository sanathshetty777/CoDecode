const mongoose = require("mongoose");

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: emailRegex // Email validation regex
  },
  password: { 
    type: String, 
    required: true 
  },
  // Required username field for new users
  username: { 
    type: String, 
    required: true, 
    unique: true
  }
});

// Ensure a default username is generated for users that do not have one
userSchema.pre('save', function(next) {
  if (!this.username) {
    // Generate a username from the email if it's missing
    this.username = this.email.split('@')[0]; // Username as the part before '@'
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports={ User };
