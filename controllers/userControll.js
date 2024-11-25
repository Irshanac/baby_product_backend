import user from '../models/userModels.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/jwt.js';
import asyncErrorResolver from "../middlewares/asyncErrorResolver.js"
export const registaerUser=asyncErrorResolver(async(req,res)=>{
    const {username,name,password,email}=req.body
    const existingUser=await user.findOne({email})
    if(existingUser)
    {
        return res.status(400).json({messege:'User already exists,please loigin...'})
    }
    const hashPassword=await bcrypt.hash(password,10)
    const newUser=new user({name,username,email,password:hashPassword})
    await newUser.save()
    const token = generateToken(newUser._id);
        res.json({status: "success", message: "User registered successfully",token});
    });
// export const loginUser=asyncErrorResolver(async(req,res)=>{
//     const {email,password}=req.body;
//     const userData=await user.findOne({email})
//     if(!userData)
//     {
//         return res.status(400)
//     }
// })