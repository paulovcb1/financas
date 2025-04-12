import cors from 'cors';
import express from 'express';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

export default app;