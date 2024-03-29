import { body, param } from 'express-validator';

export const loginValidation = [
    body('phone', 'Неверный формат телефона').isString().isLength({min: 10, max: 12}),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
    body('phone', 'Неверный формат телефона').isString().isLength({min: 10, max: 12}),
    body('password', 'Пароль должен содержать минимум 5 символов').isString().isLength({ min: 5 }),
    body('name', 'Требуется имя').isLength({ min: 3 }),
];

export const bookingCreateValidation = [
    body('user_id', 'Неверный ID пользователя').isString().isLength({min: 24, max: 24}),
    body('restaurant_id', 'Неверный ID ресторана').isString().isLength({min: 24, max: 24}),
    body('booking_start', 'Неверный формат времени начала').isString(),
    body('booking_end', 'Неверный формат времени окончания').isString(),
    body('guest_count', 'Неверное количество гостей').isNumeric(),
];

export const bookingIdValidation = [
    param('id', 'Неверный ID заказа').isString().isLength({min: 24, max: 24}),
];