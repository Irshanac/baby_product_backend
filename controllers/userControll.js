import {userRegisterServices,loginUserService} from '../service/userServices.js'
import { generateToken } from "../utils/jwt.js";
import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import { STATUS } from '../utils/constants.js';

// controllers/userController.js

export const registerUser = asyncErrorResolver(async (req, res) => {
  const data = req.body;
  const id = await userRegisterServices(data);
  const token = generateToken(id);
  res.json({
    status: STATUS.SUCCESS,
    message: "User registered successfully",
    token,
  });
});

// Login
export const loginUser = asyncErrorResolver(async (req, res) => {
  const { email, password } = req.body;
  const userData = await loginUserService(email, password);
  const token = generateToken(userData._id);
  res.status(200).json({
    status: STATUS.SUCCESS,
    message: userData.isAdmin ? "Admin Login successful" : "Login successful",
    token,
    user: userData,
  });
});

