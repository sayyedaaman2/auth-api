import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 100 requests per IP
  message: {
    message: "Too many requests, try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});