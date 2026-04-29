const jwt = require("jsonwebtoken");
const User = require("../models/User");

// PROTECT MIDDLEWARE
const protect = async (req, res, next) => {

  try {

    let token;

    console.log("Headers:", req.headers); // DEBUG

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token found:", token.substring(0, 20) + "..."); // DEBUG

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();

    } else {

      console.log("No authorization header found"); // DEBUG
      return res.status(401).json({ message: "No token provided" });

    }

  } catch (error) {

    console.log("Auth error:", error.message); // DEBUG
    return res.status(401).json({ message: "Not authorized" });

  }

};


// AUTHORIZE ROLE
const authorize = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        message: "Access denied. Role not allowed."
      });

    }

    next();

  };

};


module.exports = {
  protect,
  authorize
};
