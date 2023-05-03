import express from 'express';
import User from '../entities/User.js';
import { validationResult } from 'express-validator';
import { loginValidation, registerValidation } from '../utils/validations.js';
const authRouter = express.Router();

// middleware that is specific to this router
authRouter.use(function timeLog(req, res, next) {
  console.log('TODO: log this ', Date.now());
  next();
});

// Register
try {
  authRouter.post('/register', registerValidation, async function(req, res) {
    const {phone, password, name} = req.body;
    // Validate req data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    const isUsed = await User.findOne({phone});
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

  });
} catch(err) {
  console.log(err);
  res.status(500).json({
    message: 'Не удалось создать пользователя'
  });
}

// Login
try {
  authRouter.post('/login', async function(req, res) {
    res.send({
      message: 'Авторизация',
    });
});
} catch(err) {
  console.log(err);
  res.status(500).json({
    message: 'Не удалось авторизоваться'
  });
}

export default authRouter;