import express from 'express'
import { addProduct,getProduct,deleteProduct ,editProduct,singleProduct,productByCategory} from '../controllers/productControll.js'
import authenticate from '../middlewares/authMiddleware.js'
import isAdmin from '../middlewares/isAdmin.js'
const router=express.Router()
router.post("/api/admin/addProduct",authenticate,isAdmin,addProduct)
router.get("/getProduct",getProduct)
router.delete("/api/admin/deleteProduct/:id",authenticate,isAdmin,deleteProduct)
router.put("/api/admin/editproducts",authenticate,isAdmin,editProduct)
router.get("/api/admin/singleProduct/:id",authenticate,isAdmin,singleProduct)
router.get("/api/admin/product/category/",authenticate,isAdmin,productByCategory)
export default router