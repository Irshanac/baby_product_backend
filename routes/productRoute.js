import express from 'express'
import { addProduct,getProduct,deleteProduct ,editProduct} from '../controllers/productControll.js'
import authenticate from '../middlewares/authMiddleware.js'
import isAdmin from '../middlewares/isAdmin.js'
const router=express.Router()
router.post("/addProduct",authenticate,isAdmin,addProduct)
router.get("/getProduct",getProduct)
router.delete("/deleteProduct/:id",authenticate,isAdmin,deleteProduct)
router.put("/editProduct",authenticate,isAdmin,editProduct)
export default router