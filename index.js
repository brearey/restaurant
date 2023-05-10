import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import databaseConnect from './db.js';
import bookingRouter from './routers/bookingRouter.js';
import restaurantRouter from './routers/restaurantRouter.js';
import authRouter from './routers/authRouter.js';
import * as dotenv from 'dotenv';
import createReminder from './notification/reminder.js';

// Test find user for socket
import User from './entities/User.js';
import jwt from 'jsonwebtoken';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

// TODO: Если что
// Test connecting react app. Fix CORS problem
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

databaseConnect();

app.use(express.json());
app.use('/booking', bookingRouter);
app.use('/restaurant', restaurantRouter);
app.use('/auth', authRouter);

//TODO global connected user
let socket;
// Test create reminder with request
app.get('/remind', (req, res) => {
    res.json({
        reminder: createReminder(Date.now(), socket)
    });
    if (socket) {
        socket.in('notification_room').emit('notify', 'i have a remind');
    }
});

io.on("connection", async (_socket) => {
    socket = _socket;
    //Join client to the room
    socket.join('notification_room');
    //Вытащить имя
    const decoded = jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET);
    // Find user in DB
    const user = await User.findById(decoded._id);
    console.log(`Добро пожаловать, ${user.name}!`);

    //Test create reminder
    socket.emit('notify', createReminder(Date.now(), socket, user.name));

    // User not found
    if (!user) {
        return res.status(404).json({
            message: 'Пользователь не найден',
        });
    }
});

// Start app
httpServer.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
});