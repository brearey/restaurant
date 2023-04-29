const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const bookingRouter = require('./routers/bookingRouter');

app.use('/booking', bookingRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`)
})