const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const bookingRouter = require('./routers/bookingRouter');
const userRouter = require('./routers/userRouter');

app.use('/booking', bookingRouter);
app.use('/users', userRouter);

// Test zone
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));
// Test zone end

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`)
});