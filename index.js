import express from 'express';
import databaseConnect from './db.js';
import bookingRouter from './routers/bookingRouter.js';
import authRouter from './routers/authRouter.js';
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

databaseConnect();

app.use(express.json());
app.use('/booking', bookingRouter);
app.use('/auth', authRouter);

// Start app
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`)
});