import mongoose from 'mongoose';
import Restaurant from '../entities/Restaurant.js';
import User from '../entities/User.js';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const restaurants = [
    {
        name: 'Кристиан',
        spec: 'ООО Рога и копыта',
        slots: [
            {
                date: '30 апреля 2023',
                time: '15:00 - 16:00', //TODO fix this with Date
                isBooked: false,
            },
            {
                date: '30 апреля 2023',
                time: '16:00 - 17:00',
                isBooked: true,
            },
            {
                date: '1 мая 2023',
                time: '15:00 - 16:00',
                isBooked: false,
            },
            {
                date: '1 мая 2023',
                time: '16:00 - 17:00',
                isBooked: false,
            },
        ],
    },
    {
        name: 'Чочур-Муран',
        spec: 'Европейская, Русская',
        slots: [
            {
                date: '30 апреля 2023',
                time: '15:00 - 16:00',
                isBooked: true,
            },
            {
                date: '30 апреля 2023',
                time: '16:00 - 17:00',
                isBooked: true,
            },
            {
                date: '1 мая 2023',
                time: '15:00 - 16:00',
                isBooked: true,
            },
            {
                date: '1 мая 2023',
                time: '16:00 - 17:00',
                isBooked: false,
            },
        ],
    },
    {
        name: 'Махтал',
        spec: 'Вкусно',
        slots: [
            {
                date: '30 апреля 2023',
                time: '15:00 - 16:00',
                isBooked: true,
            },
            {
                date: '30 апреля 2023',
                time: '16:00 - 17:00',
                isBooked: true,
            },
            {
                date: '1 мая 2023',
                time: '15:00 - 16:00',
                isBooked: false,
            },
            {
                date: '1 мая 2023',
                time: '16:00 - 17:00',
                isBooked: false,
            },
        ],
    },
    {
        name: 'Тотоойук',
        spec: 'Ойунского',
        slots: [],
    },
]

const users = [
    {
        phone: '79241231201',
        password: '12345678',
        name: 'Гарик Харламов',
    },
    {
        phone: '79241231202',
        password: '12345678',
        name: 'Иван Абрамов',
    },
    {
        phone: '79241231203',
        password: '12345678',
        name: 'Алексей Щербаков',
    },
    {
        phone: '79241231204',
        password: '12345678',
        name: 'Нурлан Сабуров',
    },
]

restaurants.forEach(restaurant => {
    const doc = new Restaurant(restaurant);
    sendDocument(doc).then((doc) => {
        console.log(`Ресторан ${doc._id} добавлен`);
    });
});

users.forEach(user => {
    const doc = new User(user);
    sendDocument(doc).then((doc) => {
        console.log(`Пользователь ${doc._id} добавлен`);
    });
});

async function dropCollection(model) {
    await model.collection.drop();
}

async function sendDocument(doc) {
    return await doc.save();
}