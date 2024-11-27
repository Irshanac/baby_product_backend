import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'
import { addToCart, getCart ,deleteCart} from '../controllers/cartControll.js'
const router=express.Router()
router.post('/addToCart',authenticate,addToCart)
router.get('/',authenticate,getCart)
router.post('/deleteCart',authenticate,deleteCart)
export default router