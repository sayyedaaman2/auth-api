import User from '../models/user.model.js'
import { verifyRefreshToken } from '../utils/jwt.js';
export const signUp = async (req, res, next) => {
  try {
    const userCreated = await User.create(req.body);

    const { password, ...safeUser } = userCreated.toObject();

    return res.status(201).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }
    const token = user.generateToken();
    const refreshToken = user.generateRefreshToken();
    const { password: _, refreshToken: __, ...safeUser } = user.toObject();

    await User.findOneAndUpdate(user._id, { $set: { refreshToken: refreshToken } })
    return res.status(200).cookie("refreshToken", refreshToken, {
      httpOnly: true,     // cannot access via JS (security)
      secure: false,      // true in production (HTTPS)
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }).json({
      success: true,
      message: "Login successful",
      token,
      user: safeUser,
    });

  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(204).json({ message: "No user logged in" });
    }

    // find user with this refresh token
    const user = await User.findOne({ refreshToken });

    if (user) {
      user.refreshToken = null; // 🔥 invalidate token
      await user.save();
    }

    // clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // true in production
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};




export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      })
    }
    const newAccessToken = user.generateToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};


export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();


    return res.status(201).json({
      success: true,
      users
    });
  } catch (error) {
    next(error);
  }
};