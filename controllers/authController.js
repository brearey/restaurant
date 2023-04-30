const jwt = require('jsonwebtoken');
const validationResult = require('express-validator');
const User = require('../entities/User');
require('dotenv').config();

export const register = async (req, res) => {
    try {
        // Validate req data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        // Create doc for mongodb
        const doc = new User({
            phone: req.body.phone,
            password: req.body.password,
            name: req.body.name,
        });
        const user = await doc.save();

        // Generate and send the JWT in response
        const token = jwt.sign({_id: user._id}, proccess.env.JWT_SECRET, {expiresIn: '30d',});

        // Вынос хэша пароля из ответа
        const {passwordHash, ...userData} = user._doc;

        // Response to client
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Регистрация не удалась',
        });
    }
};

export const login = async (req, res) => {
    try {
        // Find user in DB
        const user = await User.findOne({email: req.body.email});

        // User not found
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        // Check password
        const isValidPass = req.body.password == user._doc.passwordHash;
        if (!isValidPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            });
        }

        // Generate and send the JWT in response
        const token = jwt.sign({_id: user._id}, proccess.env.JWT_SECRET, {expiresIn: '30d',});

        // Вынос хэша пароля из ответа
        const {passwordHash, ...userData} = user._doc;

        // Response to client
        res.json({
            ...userData,
            token,
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Авторизация не удалось'
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
        const {passwordHash, ...userData} = user._doc;

        // Response to client
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Ошибка',
        });
    }
};