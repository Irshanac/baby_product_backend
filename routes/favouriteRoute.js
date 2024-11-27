import {addToFavourites,removeSingleFavourite} from '../controllers/favouriteControll.js'
import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'
const router=express.Router()
router.post('/addFavourite',authenticate,addToFavourites)
router.get('/deleteFavourite',authenticate,removeSingleFavourite)
export default router