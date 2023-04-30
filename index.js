const express = require('express');
const mongoose = require('mongoose');
const bookingRouter = require('./routers/bookingRouter');
const authRouter = require('./routers/authRouter');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

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