import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { User } from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5100;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Add error handling and retry logic for MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
    });
    console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit if we can't connect to MongoDB
  }
};

connectDB();

app.post('/api/users', async (req, res) => {
  try {
    console.log('Received user data:', req.body);
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    const user = new User(req.body);
    const savedUser = await user.save();
    console.log('User saved successfully:', savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to save user data',
      details: error.errors || {}
    });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to fetch user data',
      details: error.errors || {}
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});