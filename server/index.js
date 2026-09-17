import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payment.js';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Bind Middlewares
app.use(cors({ origin: true, credentials: true })); // Allow all origins for dev
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(express.json());
app.use(mongoSanitize());

// API Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Root Checkpoint endpoint
app.get('/', (req, res) => {
  res.json({ message: 'AsiaMart E-Commerce Backend Server is running successfully!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server successfully started on http://localhost:${PORT}`);
});
