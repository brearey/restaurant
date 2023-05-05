// TODO уведомление за 2 часа до часа Х
import cron from 'node-cron';
import databaseConnect from '../db.js';
import Booking from '../entities/Booking.js';

databaseConnect();

cron.schedule('*/10 * * * * *', async () => {
    const bookings = await Booking.find();
    for (const booking of bookings) {
        const nowHours = new Date().getHours();
        console.log(`Время начала столика: ${booking.booking_start}`);
        console.log(`Осталось часов до Х: ${booking.booking_start.getHours() - nowHours}`);
    }
});