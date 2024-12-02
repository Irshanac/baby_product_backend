import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import {getAllUserServices, userBlockService,singleUserServices} from '../service/adminServices.js'
export const userBlock=asyncErrorResolver(async(req,res)=>{
    const {id}=req.params
    const message=await userBlockService(id)
    res.json({status:"status",message})
})
export const allUser=asyncErrorResolver(async(req,res)=>{
    const {message,userlist}=await getAllUserServices()
    res.json({status:"success",message,users:userlist})
})
export const singleUser=asyncErrorResolver(async(req,res)=>{
    const {id}=req.params
    const user=await singleUserServices(id)
    res.json({status:"success",user})
})