const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  profilePhoto: { type: String, default: "" },
  gender: { type: String, default: "" },
  address: { type: String, default: "" },
  age: { type: String, default: "" },
});

// ✅ Check if the model already exists to prevent OverwriteModelError
module.exports = mongoose.models.UserProfile || mongoose.model("UserProfile", UserProfileSchema);
