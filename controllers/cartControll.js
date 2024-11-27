import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import { AddCartServices ,getCartServices,deleteCartService} from "../service/cartService.js";
//add to cart
export const addToCart = asyncErrorResolver(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id; 
   const message= await AddCartServices(productId, userId);
    res.json({ status: "success", message});
});

//get all item in cart
export const getCart=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const { empty, cart } = await getCartServices(userId);
    if (empty) {
        return res.status(200).json({
            status: "success",
            message: "Your cart is empty.",
        });
    }

    res.status(200).json({
        status: "success",
        cart
    });
})

//delete item in cart
export const deleteCart=asyncErrorResolver(async(req,res)=>{
    const {userId,cartId}=req.user._id
    await deleteCartService(userId,cartId)
    res.json({status:"success",message:"delete cart success"})
})