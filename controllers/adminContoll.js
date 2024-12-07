import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import {STATUS} from '../utils/constants.js'
import {getAllUserServices, userBlockService,singleUserServices,getAllOrderServices,getTotalRevenueServices} from '../service/adminServices.js'
//user blocking
export const userBlock=asyncErrorResolver(async(req,res)=>{
    const {id}=req.params
    const user=await userBlockService(id)
    const message = user.isBlock? "User is blocked": "User is unblocked";
    res.json({
        status: STATUS.SUCCESS,
        message
      });
})


//ALL USERS
export const allUser=asyncErrorResolver(async(req,res)=>{
    const usersList=await getAllUserServices()
    const message=usersList.length? "user list ":"user is empty"
    res.json({status:STATUS.SUCCESS,message,user:usersList})     
})

//specific user
export const singleUser=asyncErrorResolver(async(req,res)=>{
    const {id}=req.params
    const user=await singleUserServices(id)
    res.json({status:STATUS.SUCCESS,message:"user details ...",user})
})

//order list
export const orderDetails=asyncErrorResolver(async(req,res)=>{
    const orderList=await getAllOrderServices()
    res.json({status:STATUS.SUCCESS,message:"order list ...",order:orderList})
})

//total revenue
export const totalRevenue=asyncErrorResolver(async(req,res)=>{
    const totalprofit=await getTotalRevenueServices()
    const total=totalprofit.length>0?totalprofit[0].totalRevenue:0
    res.json({status:STATUS.SUCCESS,message:"total revenue ",total})
})

//user list
 export const userCount=asyncErrorResolver(async(req,res)=>{
    const usersList=await getAllUserServices()
    res.json({status:STATUS.SUCCESS,message:"user count",count:usersList.length})
 })
