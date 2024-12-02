import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import {getAllUserServices, userBlockService,singleUserServices,getAllOrderServices,getTotalServices,userCountServices} from '../service/adminServices.js'
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
export const orderDetails=asyncErrorResolver(async(req,res)=>{
    const {message,order}=await getAllOrderServices()
    res.json({status:"success",message,order})
})
export const totalRevenue=asyncErrorResolver(async(req,res)=>{
    const total=await getTotalServices()
    res.status(200).json({status:"success",totalRevenue:total})
})
export const userCount=asyncErrorResolver(async(req,res)=>{
    const {message,count}=await userCountServices()
    res.status(200).json({status:"succeess",message,count})
})
