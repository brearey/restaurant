// TODO уведомление за 2 часа до часа Х
/*
План такой:
Клиент открывает сайт заказа столика. Регается. Логинится. Получает токен авторизации,
куда зашифрован его ID. Заказывает столик. И в момент заказа если клиент этого хочет устанавливается
уведомление через reminder.js, куда передается время начала столика и токен клиента. За два часа до
часа Х reminder инициирует событие notify для клиента с токеном. Уведомление идет по socket.io через
технологию rooms. По факту у каждого клиента будет свой room с названием его ID.
*/
import { scheduleJob } from 'node-schedule';

export default function createReminder(booking_start) {
    try {
        if (!compareBookingStartWithNow(booking_start)) {
            return {
                message: `Дата в прошедшем времени. Сейчас: ${Date()}`,
            }
        }
        const date = getRemindTime(booking_start);
        scheduleJob(date, function () {
            console.log('ITS REMIND TIME!', Date.now());
        });
    } catch (err) {
        console.log(err);
    }
}

function getRemindTime(booking_start) {
    const date = new Date(booking_start);
    const millisPerHour = 3600000;
    // return new Date(date.getTime() - 2 * millisPerHour); // TODO uncomment to production
    return new Date(date.getTime() + 5000);
}

function compareBookingStartWithNow(booking_start) {
    const date = new Date(booking_start);
    const now = Date.now();

    return date > now;
}