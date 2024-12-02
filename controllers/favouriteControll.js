import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import {addFavouriteSerivices,removeFavouriteServices,getFavouriteServices} from '../service/favouriteServives.js'
export const addToFavourites=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const {productId}=req.body
    const message=await addFavouriteSerivices(userId,productId)
    res.json({status:"success",message})
})
export const removeSingleFavourite=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const {id}=req.params
    await removeFavouriteServices(userId,id)
    res.json({status:"success",message:"remove favourite"})
})
export const getAllFavorite=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const { empty, fav } = await getFavouriteServices(userId);
    if (empty) {
        return res.status(200).json({
            status: "success",
            message: "Your favourite is empty.",
        });
    }

    res.status(200).json({
        status: "success",
        fav
    });
})