import {addToFavourites,removeSingleFavourite,getAllFavorite} from '../controllers/favouriteControll.js'
import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'
const router=express.Router()
router.post('/addFavourite',authenticate,addToFavourites)
router.post('/deleteFavourite',authenticate,removeSingleFavourite)
router.get('/',authenticate,getAllFavorite)
export default router