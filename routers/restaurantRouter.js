import express from 'express';
import * as RestaurantController from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

// Get restaurants list
restaurantRouter.get('/', RestaurantController.getAll);

export default restaurantRouter;