import User from "../models/user.model.js";
import { verifyToken } from "../utils/jwt.js";

export const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Access token missing",
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // attach user data
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};



export const verifyRefreshToken = async (token) => {
  try {
    const decoded = verifyRefreshToken(token)

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      throw new Error("Invalid refresh token");
    }

    return user;
  } catch (error) {
    throw new Error("Refresh token expired or invalid");
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
