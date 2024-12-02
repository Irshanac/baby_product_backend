import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'
import isAdmin from '../middlewares/isAdmin.js'
import {userBlock,allUser,singleUser} from '../controllers/adminContoll.js'
const router=express.Router()
router.patch('/blockUser/:id',authenticate,isAdmin,userBlock)
router.get('/users',authenticate,isAdmin,allUser)
router.get('/users/:id',authenticate,isAdmin,singleUser)
// router.get('')
export default router
