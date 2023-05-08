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
        origin: '*'
    }
});

databaseConnect();

app.use(express.json());
app.use('/booking', bookingRouter);
app.use('/restaurant', restaurantRouter);
app.use('/auth', authRouter);

// TODO: Если что
// Test connecting react app. Fix CORS problem
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

//TODO global connected user
let socket;
// Test create reminder with request
app.get('/remind', (req, res) => {
    res.json({
        reminder: createReminder(Date.now())
    });
    if (socket) {
        socket.in('notification_room').emit('notify', 'i have a remind');
    }
});

// Test client for socket io
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.get('/client', (req, res) => {
//     var fileName = './client/index.html';
//     res.sendFile(fileName, { root: __dirname }, function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Sent:', fileName);
//         }
//     })
// });

io.on("connection", (_socket) => {
    socket = _socket;
    //Joinc client to the room
    socket.join('notification_room');
    console.log(`Пользователь ${socket.auth} подключился с адреса ${socket.address}`);
    console.log(`Данные пользователя: ${socket.data.username}`);
    console.log(`Все сокеты: ${io.sockets.clients}`);
    socket.emit('notify', `Ты успешно подключился к ${socket.rooms.values().next().value}`);

    socket.on("auth", (data) => {
        console.log('Собыите auth:');
        console.dir(data);
    });
});

// Start app
httpServer.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`)
});