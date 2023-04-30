const express = require('express');
const authRouter = express.Router();
const User = require('../entities/User');
const { loginValidation, registerValidation, postCreateValidation } = require('./validations.js');

// middleware that is specific to this router
userRouter.use(function timeLog(req, res, next) {
  console.log('TODO: log this ', Date.now());
  next();
});

// Register
try {
  authRouter.post('/register', registerValidation, async function(req, res) {
    
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
    const doc = new User({
        phone: req.body.phone,
        password: req.body.password,
        name: req.body.name,
    });

    const user = await doc.save();

    res.send(user);
});
} catch(err) {
  console.log(err);
  res.status(500).json({
    message: 'Не удалось авторизоваться'
  });
}

module.exports = authRouter;