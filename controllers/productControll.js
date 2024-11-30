import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import { addProductionServices ,getProductServices,deleteProductServices,editProductServices} from "../service/productService.js";
import CustomError from "../utils/customError.js";
//add product
export const addProduct = asyncErrorResolver(async (req, res) => {
  const { name, ...rest } = req.body;

  const data = await addProductionServices({ name, ...rest });
  res.status(201).json({
    success: true,
    message: "Product added successfully.",
    data,
  });
});


//get all product
export const getProduct=asyncErrorResolver(async(req,res)=>{
  const data=await getProductServices()
    res.status(201).json({
      success:true,
      message:"get all product",
      data
    })
})

//delete product
export const deleteProduct=asyncErrorResolver(async(req,res)=>{
  const {id}=req.params
  const message= await deleteProductServices(id)
  res.json({status:"success",message})
})

//edit product
export const editProduct=asyncErrorResolver(async(req,res)=>{
  const { _id, ...updateProduct } = req.body;
  if (!_id) {
      throw new CustomError("product is not found",400)
  }
  const updatedProduct = await editProductServices(_id, updateProduct);
  res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: updatedProduct,
  });

})