import express from 'express';
import Booking from '../entities/Booking.js';
import { validationResult } from 'express-validator';
import { bookingCreateValidation } from '../utils/validations.js';
import Restaurant from '../entities/Restaurant.js';
import User from '../entities/User.js';
const bookingRouter = express.Router();

// middleware that is specific to this router
bookingRouter.use(function timeLog(req, res, next) {
  console.log('TODO: log this ', Date.now());
  next();
});

// Get all bookings
bookingRouter.get('/', function (req, res) {
  res.send([
    {
      id: 'booking1',
      user_id: 'user1',
      restaurant_id: 'res1',
      slot_index: 1,
    },
    {
      id: 'booking2',
      user_id: 'user2',
      restaurant_id: 'res2',
      slot_index: 2,
    },
    {
      id: 'booking3',
      user_id: 'user3',
      restaurant_id: 'res3',
      slot_index: 3,
    },
  ]);
});
// Get one booking by id
bookingRouter.get('/:id', function (req, res) {
  const booking_id = req.params.id;
  res.send(
    {
      id: booking_id,
      user_id: 'user' + booking_id,
      restaurant_id: 'restaurant #' + booking_id,
      slot_index: 1,
    }
  );
});

// Create booking by id
bookingRouter.post('/create', bookingCreateValidation, async function (req, res) {
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
bookingRouter.delete('/:id', function (req, res) {
  const booking_id = req.params.id;
  res.send(
    {
      deleted_booking: booking_id
    }
  );
});

export default bookingRouter;