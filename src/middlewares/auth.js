const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../config/variables");

const authMiddleware = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    req.user = null;
    return next();
  }

  const token = authToken.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized, no token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    return next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
module.exports = authMiddleware;
