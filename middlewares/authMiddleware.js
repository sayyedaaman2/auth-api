import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    // Expect "Bearer <token>"
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch user (without password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user no longer exists",
      });
    }

    // attach user to request
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid or expired token",
    });
  }
};
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.userType !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied — Admins only."
    });
  }

  next();
};
