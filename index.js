import express from 'express';
import dotenv from 'dotenv';
import connectionDB from './config/db.js';
import userRoutes from './routes/userRouter.js'
dotenv.config();

const app = express();
app.use(express.json())
connectionDB(); 

const PORT = process.env.PORT || 4500;
app.post("/",(req,res)=>{
  res.send("it is a baby product shop")
})
app.use('/user',userRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
