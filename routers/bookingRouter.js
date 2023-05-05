import express from 'express';
import Booking from '../entities/Booking.js';
import { validationResult } from 'express-validator';
import { bookingCreateValidation, bookingIdValidation } from '../utils/validations.js';
import checkAuth from '../utils/checkAuth.js';
import Restaurant from '../entities/Restaurant.js';
import User from '../entities/User.js';
const bookingRouter = express.Router();

// middleware that is specific to this router
bookingRouter.use(function timeLog(req, res, next) {
  console.log('TODO: log this ', Date.now());
  next();
});

// Get one booking by id
bookingRouter.get('/', checkAuth, async function (req, res) {
  // const booking_id = req.params.id;

  const booking = await Booking.find({user_id: req.body.user_id});
  if (!booking) {
    return res.status(404).json({
      message: 'У вас нет такого заказа'
    });
  }

  res.send(booking);
});

// Create booking by id
bookingRouter.post('/', checkAuth, bookingCreateValidation, async function (req, res) {
  // Validate req data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const { user_id, restaurant_id, slot_index, guest_count } = req.body;

  // Check rest exist
  const restaurant = await Restaurant.findById(restaurant_id);
  if (!restaurant) {
    return res.status(404).json({
      message: 'Ресторан с таким ID не найден',
    });
  }
  // Check user exist
  const user = await User.findById(user_id);
  if (!user) {
    return res.status(404).json({
      message: 'Пользователь с таким ID не найден',
    });
  }

  // Есть ли свободные столики
  if (restaurant.slots.length == 0) {
    return res.status(404).json({
      message: 'Нет свободных столиков',
    });
  }

  // Create booking
  const doc = new Booking({
    user_id: user_id,
    restaurant_id: restaurant_id,
    slot_index: slot_index,
    guest_count: guest_count
  });
  const booking = await doc.save();
  res.send(booking);
});

// Delete booking by id
bookingRouter.delete('/:id', checkAuth, bookingIdValidation, async function (req, res) {
  // Validate req data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const booking_id = req.params.id;
  const booking = await Booking.findById(booking_id);
  // Check booking exist
  if (!booking) {
    return res.status(404).json({
      message: 'Заказ с таким ID не найден',
    });
  }
  const result = await Booking.deleteOne(booking);
  res.send({
    message: 'Заказ удален',
  });
});

export default bookingRouter;