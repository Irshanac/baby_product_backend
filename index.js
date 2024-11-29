import express from 'express';
import dotenv from 'dotenv';
import connectionDB from './config/db.js';
import userRoutes from './routes/userRouter.js';
import cartRoutes from './routes/cartRoute.js'
import productRouters from './routes/productRoute.js';
import favouriteRouter from './routes/favouriteRoute.js'
import orderRouter from './routes/orderRouter.js'
import cors from 'cors';  

dotenv.config();
const app = express();
app.use(cors());  
app.use(express.json());
connectionDB();

app.use('/user', userRoutes); 
app.use('/', productRouters);  
app.use('/cart',cartRoutes)
app.use('/favourite',favouriteRouter)
app.use('/order',orderRouter)

const PORT = process.env.PORT 
app.listen(PORT);
