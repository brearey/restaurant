import { body } from 'express-validator';

export const loginValidation = [
    body('phone', 'Неверный формат телефона').isString().isLength({min: 10, max: 12}),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
    body('phone', 'Неверный формат телефона').isString().isLength({min: 10, max: 12}),
    body('password', 'Пароль должен содержать минимум 5 символов').isString().isLength({ min: 5 }),
    body('name', 'Требуется имя').isLength({ min: 3 }),
];

export const tokenValidation = [
    body('token', 'Неверный токен').isString().isLength({min: 172, max: 172})
];

export const bookingCreateValidation = [
    body('user_id', 'Неверный ID пользователя').isString().isLength({min: 24, max: 24}),
    body('restaurant_id', 'Неверный ID ресторана').isString().isLength({min: 24, max: 24}),
    body('slot_index', 'Неверный индекс слота').isNumeric(),
    body('guest_count', 'Неверное количество гостей').isNumeric(),
];