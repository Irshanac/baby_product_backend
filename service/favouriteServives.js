import Favourite from "../models/favoriteModel.js";
import product from "../models/productModel.js";
import CustomError from "../utils/customError.js";
export const addFavouriteSerivices=async(userId,productId)=>{
    const existingProduct=await product.findOne({_id:productId})
    if(!existingProduct)
        throw new CustomError("product is not available",301)
    let userFavourite=await Favourite.findOne({user:userId})
    if(!userFavourite)
    {
        userFavourite=new Favourite({user:userId,favourite:[]})
    }
    const existingFav=userFavourite.favourite.find((item)=>item.toString()===productId)
    if (existingFav) {
        return "Item already exists in favourites.";
    }
    userFavourite.favourite.push(productId)
    await userFavourite.save();
    return "Product added to favourites successfully.";
}
export const removeFavouriteServices=async(userId,productId)=>{
    const existingFavorite=Favourite.findOne({user:userId})
    if(!existingFavorite)
    {
        throw new CustomError("favorite is not present",301)
    }
    const updateFavorite=existingFavorite.favourite.filter((product)=>product!==productId)
    existingFavorite.favourite=updateFavorite
    existingFavorite.save()
}