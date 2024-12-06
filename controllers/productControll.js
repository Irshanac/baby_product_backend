import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import { addProductionServices ,productService,deleteProductServices,editProductServices,singleProductServices} from "../service/productService.js";
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


//delete product
export const deleteProduct=asyncErrorResolver(async(req,res)=>{
  const {id}=req.params
  const deleteData= await deleteProductServices(id)
  if (deleteData) {
    res.json({status:"success",message:"Product deleted successfully"})
  }

  throw new CustomError("Error occurred while deleting the product.", 500);
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


//get single product
export const singleProduct =asyncErrorResolver(async(req,res)=>{
  const {id}=req.params
  const product=await singleProductServices(id)
  res.status(200).json({
    status:"success",
    product
  })
})

// export const productByCategory=asyncErrorResolver(async(req,res)=>{
//   const { category } = req.query;
//   const {message,products}=await productByCategoryService(category)
//   res.status(200).json({status:"success",message,products})
// })


//get product
export const getProducts=asyncErrorResolver(async(req,res)=>{
  const {category,page,search}=req.query
  const result = await productService({
    category,
    page: parseInt(page, 10) || 1,
    limit: 10,
    search,
  });
  res.status(200).json({
    status: "success",
    ...result,
  });
})