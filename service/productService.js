import product from "../models/productModel.js";
import CustomError from "../utils/customError.js";
export const addProductionServices = async ({ name, ...rest }) => {
    const existingItem = await product.findOne({ name });
    if (existingItem) {
      throw new CustomError("Product already exists.", 400);
    }
  
    const newProduct = new product({ name, ...rest });
    await newProduct.save();
  
    return newProduct;
  };