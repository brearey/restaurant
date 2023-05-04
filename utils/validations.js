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