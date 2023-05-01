import express from 'express';
import mongoose from 'mongoose';
import bookingRouter from './routers/bookingRouter.js';
import authRouter from './routers/authRouter.js';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/booking', bookingRouter);
app.use('/auth', authRouter);

// Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

// Start app
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`)
});