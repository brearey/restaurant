import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import databaseConnect from './db.js';
import bookingRouter from './routers/bookingRouter.js';
import restaurantRouter from './routers/restaurantRouter.js';
import authRouter from './routers/authRouter.js';
import * as dotenv from 'dotenv';
import createReminder from './notification/reminder.js';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        // or with an array of origins
        // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
        credentials: true
      }
});

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

io.on("connection", (socket) => {
    console.log(`User ${socket} is connected`);
});

// Start app
httpServer.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`)
});




