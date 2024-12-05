import bcrypt from 'bcrypt'
import user from '../models/userModels.js'
export const userRegisterServices = async (data) => {
    const userExists = await user.findOne({ email: data.email });
    if (userExists) {
      const error = new Error("User already exists");
      error.statusCode = 400; 
      throw error;
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new user({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      username:data.username
    });
  
    const savedUser = await newUser.save();
  
    return savedUser._id; 
  };
  

  export const loginUserService = async (email, password) => {
    const userData = await user.findOne({ email });
    if (!userData) {
        const error = new Error("Please create an account, Email is invalid");
       error.statusCode = 400; 
      throw error;
    }
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
        const error = new Error("Invalid Password, Try Again");
       error.statusCode = 400; 
      throw error;
    }
    if (userData.isBlock) {
        const error = new Error("Your account is blocked. Contact support.");
       error.statusCode = 403; 
      throw error;
    }
  
    return userData; 
  };