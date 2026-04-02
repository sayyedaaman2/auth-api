import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import serverConfig from '../config/server.config.js'
import { userTypes } from "../utils/contants.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userType: {
      type: String,
      enum: userTypes.values,
      default: userTypes.USER,
    },
    refreshToken : {
      type : String
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  // DO NOT use arrow function here: need `this`
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      userType: this.userType,
    },
    serverConfig.JWT_SECRET,
    {
      expiresIn: serverConfig.JWT_EXPIRES_IN,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      userType: this.userType,
    },
    serverConfig.JWT_REFRESH_SECRET,
    {
      expiresIn: serverConfig.JWT_REFRESH_EXPIRES_IN ,
    }
  );
};


const User = mongoose.model("User", userSchema);
export default User;
