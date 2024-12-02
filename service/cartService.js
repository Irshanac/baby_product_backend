import product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import CustomError from "../utils/customError.js";

//add to cart
export const AddCartServices=async(productId,userid)=>{
    
    //find the product
    const existingItem=await product.findById(productId)
    // console.log("existing product.....",existingItem)
    console.log(existingItem,"existing.....")
    if(!existingItem)
        throw CustomError("product is not present",401)
   
    let cart=await Cart.findOne({user:userid})
    if (!cart) {
        // create a new one
        cart = new Cart({ user: userid, products: [] });
    }
    const existingIndex=cart.products.findIndex((item) => item.product.toString() === productId)
    let message;
    
    if(existingIndex > -1)
    {
        const currentQuantity = cart.products[existingIndex].quantity;
        if (currentQuantity + 1 > existingItem.quantity) {
            return "You cannot add the product to the cart. Insufficient stock.";
        }
        cart.products[existingIndex].quantity+=1
        message = "Product already exists in the cart, quantity increased.";
    }   
    else
    {
        cart.products.push({product:productId,quantity:1})
        message = "Product added to the cart successfully.";
    }
    await cart.save()
    return message
}
export const getCartServices=async(userId)=>{
    // const userCart=await Cart.findOne({user:userId})
    // const cart=userCart.products
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if(!cart)
        return { empty: true, cart: null };
    return { empty: false, cart }
}
export const deleteCartService=async(userId,productId)=>{
    const userCart=await Cart.findOne({user:userId})
    if (!userCart) {
        throw new CustomError("Cart not found for the user.",401);
    }
    const updatedProducts = userCart.products.filter(
        (item) => item.product.toString() !== productId
    );
    userCart.products = updatedProducts;
    await userCart.save();
}