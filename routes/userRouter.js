import express from 'express'
import {registaerUser} from '../controllers/userControll.js'
const router=express.Router()
router.post('/register',registaerUser)
export default router
