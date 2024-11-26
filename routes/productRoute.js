import express from 'express'
import { addProduct } from '../controllers/productControll.js'
import authenticate from '../middlewares/authMiddleware.js'
import isAdmin from '../middlewares/isAdmin.js'
const router=express.Router()
router.post("/add",authenticate,isAdmin,addProduct)
// router.get("/",getProduct)
export default router