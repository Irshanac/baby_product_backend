import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import { addProductionServices ,getProductServices} from "../service/productService.js";
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