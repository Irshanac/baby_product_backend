import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError.js';
import User from '../models/userModels.js';

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      throw new CustomError("Authorization token missing", 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
