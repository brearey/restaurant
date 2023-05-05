// TODO уведомление за 2 часа до часа Х
import { scheduleJob } from 'node-schedule';

export default function createReminder(booking_start) {
    const date = getRemindTime(booking_start);
    scheduleJob(date, function() {
        console.log('ITS REMIND TIME!', Date.now());
    });
}

function getRemindTime(booking_start) {
    const date = new Date(booking_start);
    const millisPerHour = 3600000;
    // return new Date(date.getTime() - 2 * millisPerHour); // TODO uncomment to production
    return new Date(date.getTime() + 5000);
}