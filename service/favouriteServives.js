import Favourite from "../models/favoriteModel.js";
import Product from "../models/productModel.js";
import CustomError from "../utils/customError.js";

export const addFavouriteSerivices = async (userId, productId) => {
    
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
        throw new CustomError("Product is not available.", 404);
    }
    let userFavourite = await Favourite.findOne({ user: userId });
    if (!userFavourite) {
        userFavourite = new Favourite({ user: userId, favourite: [] });
    }
    const existingFav = userFavourite.favourite.find(
        (item) => item.toString() === productId
    );
    if (existingFav) {
        return "Item already exists in favourites.";
    }
    userFavourite.favourite.push(productId);
    await userFavourite.save();

    return "Product added to favourites successfully.";
};

export const removeFavouriteServices = async (userId, productId) => {
    const userFavourite = await Favourite.findOne({ user: userId });
    if (!userFavourite) {
        throw new CustomError("No favourites found for the user.", 404);
    }
    userFavourite.favourite = userFavourite.favourite.filter(
        (item) => item.toString() !== productId
    );
    await userFavourite.save();
    return "Product removed from favourites successfully.";
};

export const getFavouriteServices = async (userId) => {
    const userFavourite = await Favourite.findOne({ user: userId }).populate("favourite");
    if (!userFavourite || userFavourite.favourite.length === 0) {
        return { empty: true, fav: [] };
    }
    return { empty: false, fav: userFavourite.favourite };
};
