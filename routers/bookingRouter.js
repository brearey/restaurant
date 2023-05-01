import express from 'express';
const bookingRouter = express.Router();

// middleware that is specific to this router
bookingRouter.use(function timeLog(req, res, next) {
  console.log('TODO: log this ', Date.now());
  next();
});

// Get all bookings
bookingRouter.get('/', function(req, res) {
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
bookingRouter.get('/:id', function(req, res) {
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
bookingRouter.post('/', function(req, res) {
  const {user_id, restaurant_id, slot, guest_count} = req.body;
  res.send(
      {
          created_booking: {
            user_id: user_id,
            restaurant_id: restaurant_id,
            slot: slot,
            guest_count: guest_count,
          }
      }
  );
});

// Delete booking by id
bookingRouter.delete('/:id', function(req, res) {
  const booking_id = req.params.id;
  res.send(
      {
          deleted_booking: booking_id
      }
  );
});

export default bookingRouter;