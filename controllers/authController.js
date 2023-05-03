import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../entities/User.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    try {
        const { phone, password, name } = req.body;
        // Validate req data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        // Check phone is exist
        const isUsed = await User.findOne({ phone });
        if (isUsed) {
            return res.status(402).json({
                message: 'Данный телефон уже занят'
            });
        }
        // Save in database
        const doc = new User({
            phone: phone,
            password: password,
            name: name,
        });
        const user = await doc.save();
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать пользователя'
        });
    }
};

export const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        // Find user in DB
        const user = await User.findOne({ phone });

        // User not found
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        // Check password
        const isValidPass = password == user._doc.password;
        if (!isValidPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            });
        }

        // Generate and send the JWT in response
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d', });

        // Response to client
        res.json({
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        // Вынос хэша пароля из ответа
        const { passwordHash, ...userData } = user._doc;

        // Response to client
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Ошибка',
        });
    }
};