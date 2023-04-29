const express = require('express');
const userRouter = express.Router();
const User = require('../entities/User');

// middleware that is specific to this router
userRouter.use(function timeLog(req, res, next) {
  console.log('TODO: log this ', Date.now());
  next();
});

// Create user by id
userRouter.post('/', async function(req, res) {
    const doc = new User({
        phone: req.body.phone,
        password: req.body.password,
        name: req.body.name,
    });

    const user = await doc.save();

    res.send(user);
});

module.exports = userRouter;