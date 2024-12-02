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