import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import {addFavouriteSerivices,removeFavouriteServices,getFavouriteServices} from '../service/favouriteServives.js'
export const addToFavourites=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const {id}=req.params
    const message=await addFavouriteSerivices(userId,id)
    res.json({status:"success",message})
})
export const removeSingleFavourite=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const {id}=req.params
    await removeFavouriteServices(userId,id)
    res.json({status:"success",message:"remove favourite"})
})

//get all favorite
export const getAllFavorite=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const userFavourite  = await getFavouriteServices(userId);
    if (!userFavourite || userFavourite.favourite.length === 0) {
        res.status(200).json({status:"success",message:"empty"})
    }
    else
        res.status(200).json({status:"success",favourite:userFavourite.favourite})
    
})