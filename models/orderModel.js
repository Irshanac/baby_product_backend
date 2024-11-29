import mongoose from 'mongoose';
const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
            quantity: { type: Number, required: true } 
        }
    ],
    date: { type: Date, required: true }, 
    name: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    total: { type: Number, required: true }
});

const Order = mongoose.model("order", orderSchema);

export default Order;
