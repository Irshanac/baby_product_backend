import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import {addFavouriteSerivices,removeFavouriteServices} from '../service/favouriteServives.js'
export const addToFavourites=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const {productId}=req.body
    const message=await addFavouriteSerivices(userId,productId)
    res.json({status:"success",message})
})
export const removeSingleFavourite=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const {productId}=req.body
    await removeFavouriteServices(userId,productId)
    res.json({status:"success",message:"remove favourite"})
})