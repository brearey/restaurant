import { body } from 'express-validator';

export const loginValidation = [
    body('phone', 'Неверная электронная почта').isMobilePhone(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
    body('phone', 'Неверный формат телефона').isMobilePhone(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5 }),
    body('name', 'Требуется имя').isLength({ min: 3 }),
];