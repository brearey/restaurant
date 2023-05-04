import express from 'express';
import * as RestaurantController from '../controllers/restaurantController.js';
const restaurantRouter = express.Router();

// middleware that is specific to this router
restaurantRouter.use(function timeLog(req, res, next) {
  console.log('TODO: log this ', Date.now());
  next();
});

// Get restaurants list
restaurantRouter.get('/list', RestaurantController.getAll);

export default restaurantRouter;