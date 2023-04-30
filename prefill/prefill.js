const mongoose = require('mongoose');
const Restaurant = require('../entities/Restaurant');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const randomRestaurants = [
    {
        name: 'Кристиан',
        spec: 'ООО Рога и копыта',
        slots: ['16:00', '18:00', '19:00'],
    },
    {
        name: 'Чочур-Муран',
        spec: 'Европейская, Русская',
        slots: ['15:00', '17:00', '18:00'],
    },
    {
        name: 'Махтал',
        spec: 'Вкусно',
        slots: ['14:00', '18:00', '20:00'],
    },
]

randomRestaurants.forEach(restaurant => {
    const doc = new Restaurant(restaurant);
    sendDocument(doc).then((doc) => {
        console.log(doc);
    });
});

async function sendDocument(doc) {
    return await doc.save();
}