import express from 'express';
import dotenv from 'dotenv';
import connectionDB from './config/db.js';
import userRoutes from './routes/userRouter.js';
import productRouters from './routes/productRoute.js';
import cors from 'cors';  // Import the CORS package

dotenv.config();

const app = express();

// Enable CORS for all origins (you can configure it to restrict to specific origins)
app.use(cors());  // Add this line to allow CORS

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to the database
connectionDB();

// Test route
app.post("/", (req, res) => {
  res.send("It is a baby product shop");
});

// Routes
app.use('/user', userRoutes);  // Routes for user operations like registration and login
app.use('/', productRouters);   // Routes for product operations (assuming product routes are defined)

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
