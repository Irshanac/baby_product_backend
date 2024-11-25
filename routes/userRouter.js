import express from 'express'
import {registaerUser,loginUser } from '../controllers/userControll.js'
const router=express.Router()
router.post('/register',registaerUser)
router.post('/login',loginUser)
export default router
