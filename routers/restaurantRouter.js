import express from 'express';
import Restaurant from '../entities/Restaurant.js';
const restaurantRouter = express.Router();

// middleware that is specific to this router
restaurantRouter.use(function timeLog(req, res, next) {
  console.log('TODO: log this ', Date.now());
  next();
});

// Create restaurant by id
restaurantRouter.post('/', async function(req, res) {
    const doc = new restaurant({
        name: req.body.name,
        spec: req.body.spec,
        slots: req.body.slots,
    });

    const restaurant = await doc.save();

    res.send(restaurant);
});

export default restaurantRouter;