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
export const getProductServices=async()=>{
  const allData=await product.find()
  return allData
}
export const deleteProductServices=async(productId)=>{
  const existingProduct = await product.findById(productId);
  if (!existingProduct) {
    throw new CustomError("Product is unavailable", 400);
  }
  const deleteData = await product.findByIdAndDelete(productId);
  if (deleteData) {
    return "Product deleted successfully.";
  }

  throw new CustomError("Error occurred while deleting the product.", 500);
};
export const editProductServices=async(id,updateProduct)=>{
  const existingProduct=await product.findById(id)
  if(!existingProduct)
  {
    throw new CustomError("product is unavailable",400)
  }
  const data =await product.findByIdAndUpdate(id,{ $set: updateProduct })
  return data
}