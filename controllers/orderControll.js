import asyncErrorResolver from '../middlewares/asyncErrorResolver.js'
import {addOrderServices,showOrderServices} from '../service/oderService.js'
export const addOrder=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const {name,address,paymentMethod,total}=req.body
    const messege=await addOrderServices(name,address,paymentMethod,total,userId)
    console.log(messege)
    res.json({status:"success",messege})
})

export const showOrders = asyncErrorResolver(async (req, res) => {
    const userId = req.user._id;

    const { message, orders } = await showOrderServices(userId);
    console.log(message)
    console.log(orders,".........")
    res.status(200).json({
        status: "success",
        message,
        orders,
    });
});