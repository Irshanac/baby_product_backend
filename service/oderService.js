import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import CustomError from "../utils/customError.js";
export const addOrderServices = async (
  name,
  address,
  paymentMethod,
  total,
  userId
) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.products.length === 0) {
    throw new CustomError(
      "Your cart is empty. Add items before placing an order."
    );
  }
  let order = await Order.findOne({ user: userId });
  if (!order) {
    order = new Order({
      user: userId,
      items: [],
      date: new Date(),
      name,
      address,
      paymentMethod,
      total,
    });
  }
  for (let item of cart.products) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new CustomError(
        `Product with ID "${item.product}" does not exist.`
      );
    }

    if (product.quantity < item.quantity) {
      return `Insufficient quantity for ${product.name}.`;
    }
    product.quantity -= item.quantity;
    await product.save();
    order.items.push({ productId: item.product, quantity: item.quantity });
  }
  await order.save();
  cart.products = [];
  await cart.save();

  return "Your order is complete.";
};
export const showOrderServices = async (userId) => {
  const orders = await Order.find({ user: userId }).populate({
    path: 'items.productId', 
    model: 'product',
  });
  if (!orders) {
    return { orders: [], message: "No orders found for this user." };
  }
  return { message: "Order list retrieved successfully.", orders };
};
