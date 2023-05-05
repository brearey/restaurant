import express from 'express';
import databaseConnect from './db.js';
import bookingRouter from './routers/bookingRouter.js';
import restaurantRouter from './routers/restaurantRouter.js';
import authRouter from './routers/authRouter.js';
import * as dotenv from 'dotenv';
import createReminder from './notification/reminder.js';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

databaseConnect();

app.use(express.json());
app.use('/booking', bookingRouter);
app.use('/restaurant', restaurantRouter);
app.use('/auth', authRouter);

// Test create reminder with request
app.get('/remind', (req, res) => {
    res.json({
        reminder: createReminder(Date.now())
    });
});

// Start app
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`)
});