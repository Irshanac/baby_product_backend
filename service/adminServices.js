import Order from '../models/orderModel.js'
import user from '../models/userModels.js'
import CustomError from '../utils/customError.js'
export const userBlockService=async(id)=>{
    const userDeatils=await user.findById(id)
    if(!userDeatils)
    {
        throw CustomError("user is not found ",400)
    }
    userDeatils.isBlock=!userDeatils.isBlock
    
    userDeatils.save()
    if(userDeatils.isBlock)
        return "user is unblocked"
    return "user blocked"
}
export const getAllUserServices=async()=>{
    const allUser=await user.find()
    const customer=allUser.filter((user)=>user.isAdmin!==true)
    if(!customer)
        return ({message:"does not have user",userlist:[]})
    return ({message:"does not have user",userlist:customer})
}
export const singleUserServices=async(id)=>{
    const users=await user.findById(id)
    if(!users)
        throw CustomError("user not found",400)
    return users
}
export const getAllOrderServices=async(id)=>{
    const orderdata=await Order.find()
    if(!orderdata)
        return ({message:"order list is empty",order:[]})
    else
        return ({message:"order list ....",order:orderdata})

}
export const getTotalServices=async()=>{
    const orderData=await Order.find()
    if(!orderData)
        return 0
        // CustomError("no order list",400)
    const total=orderData.reduce((acc,cur)=>acc+cur.total,0)
    return total

}
export const userCountServices=async()=>{
    const userlists= await getAllUserServices()
    // console.log("users",userli);
    
    // console.log("user count",userlist.length)
    if(!userlists)
            return ({messege:"no user" ,count:0})
    else
    {
        return ({message:"user count",count:userlists.userlist.length})
    }
}