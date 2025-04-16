import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employee.routes.js';
import stockRoutes from './routes/stock.routes.js';
import transactionRoutes from './routes/transaction.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Auth routes (public)
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/employees',  employeeRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

