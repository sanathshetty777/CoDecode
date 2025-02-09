const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey"; 

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "❌ No token, authorization denied!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach the decoded user info to the request
    next();  // Pass to the next middleware or route
  } catch (err) {
    console.error("Token verification error:", err);  // Log the error for debugging
    res.status(401).json({ message: "⚠️ Token is not valid!" });
  }
};

module.exports = authenticateUser;
