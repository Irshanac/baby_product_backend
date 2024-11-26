import user from "../models/userModels.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import CustomError from "../utils/customError.js";

export const registerUser = asyncErrorResolver(async (req, res) => {
  const { username, name, password, email } = req.body;
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists. Please login." });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new user({ name, username, email, password: hashPassword });
  await newUser.save();
  const token = generateToken(newUser._id);
  res.json({
    status: "success",
    message: "User registered successfully",
    token
  });
});

// Login
export const loginUser = asyncErrorResolver(async (req, res) => {
  const { email, password } = req.body;
  const userData = await user.findOne({ email });
  if (!userData) {
    throw new CustomError("Please create an account", 400);
  }
  const isMatch = await bcrypt.compare(password, userData.password);
  if (!isMatch) {
    throw new CustomError("Invalid Password, Try Again", 400);
  }
  if (userData.isBlock) {
    throw new CustomError("Your account is blocked. Contact support.", 403);
  }
  const token = generateToken(userData._id);

  res.status(200).json({
    status: "success",
    message: userData.isAdmin ? "Admin Login successful" : "Login successful",
    token,
    user: userData
  });
});
