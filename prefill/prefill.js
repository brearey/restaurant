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
                slot_start: '2023-05-05T14:26:00.000+09:00',
                slot_end: '2023-05-05T15:26:00.000+09:00',
                isBooked: false,
            },
            {
                slot_start: '2023-05-05T15:26:00.000+09:00',
                slot_end: '2023-05-05T16:26:00.000+09:00',
                isBooked: true,
            },
            {
                slot_start: '2023-05-05T16:26:00.000+09:00',
                slot_end: '2023-05-05T17:26:00.000+09:00',
                isBooked: false,
            },
            {
                slot_start: '2023-05-05T17:26:00.000+09:00',
                slot_end: '2023-05-05T18:26:00.000+09:00',
                isBooked: false,
            },
        ],
    },
    {
        name: 'Чочур-Муран',
        spec: 'Европейская, Русская',
        slots: [
            {
                slot_start: '2023-05-06T14:00:00.000+09:00',
                slot_end: '2023-05-06T15:00:00.000+09:00',
                isBooked: true,
            },
            {
                slot_start: '2023-05-06T15:00:00.000+09:00',
                slot_end: '2023-05-06T16:00:00.000+09:00',
                isBooked: true,
            },
            {
                slot_start: '2023-05-06T16:00:00.000+09:00',
                slot_end: '2023-05-06T17:00:00.000+09:00',
                isBooked: true,
            },
            {
                slot_start: '2023-05-06T17:00:00.000+09:00',
                slot_end: '2023-05-06T18:00:00.000+09:00',
                isBooked: false,
            },
        ],
    },
    {
        name: 'Махтал',
        spec: 'Вкусно',
        slots: [
            {
                slot_start: '2023-05-07T14:00:00.000+09:00',
                slot_end: '2023-05-07T15:00:00.000+09:00',
                isBooked: true,
            },
            {
                slot_start: '2023-05-07T15:00:00.000+09:00',
                slot_end: '2023-05-07T16:00:00.000+09:00',
                isBooked: true,
            },
            {
                slot_start: '2023-05-07T16:00:00.000+09:00',
                slot_end: '2023-05-07T17:00:00.000+09:00',
                isBooked: false,
            },
            {
                slot_start: '2023-05-07T17:00:00.000+09:00',
                slot_end: '2023-05-07T18:00:00.000+09:00',
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