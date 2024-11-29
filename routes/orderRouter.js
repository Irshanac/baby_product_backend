
import { addOrder,showOrders } from '../controllers/orderControll.js';
import authenticate from '../middlewares/authMiddleware.js';
import express from 'express';
const router = express.Router();
router.post('/addOrder', authenticate, addOrder);
router.post('/', authenticate, showOrders);


export default router;
