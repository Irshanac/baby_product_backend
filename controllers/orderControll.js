import asyncErrorResolver from "../middlewares/asyncErrorResolver.js";
import { addOrderServices, showOrderServices } from "../service/oderService.js";
export const addOrder = asyncErrorResolver(async (req, res) => {
  const userId = req.user._id;
  const { name, address, paymentMethod, total } = req.body;
  await addOrderServices(
    name,
    address,
    paymentMethod,
    total,
    userId
  );
  res.status(200).json({status:"success",message:"order success"})
});

//get all orders
export const showOrders = asyncErrorResolver(async (req, res) => {
    const userId = req.user._id; 
    const { page } = req.query; 
    const result = await showOrderServices(
      userId,
      parseInt(page, 10) || 1, 
      10 
    );
    res.status(200).json({
      status: "success",
      ...result,
    });
  });
  
