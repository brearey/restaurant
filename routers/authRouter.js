import express from 'express';
import * as AuthController from '../controllers/authController.js';
import { loginValidation, registerValidation, tokenValidation } from '../utils/validations.js';
import * as dotenv from 'dotenv';
dotenv.config();

const authRouter = express.Router();

// middleware that is specific to this router
authRouter.use(function timeLog(req, res, next) {
  console.log('TODO: log this ', Date.now());
  next();
});

// Register
authRouter.post('/register', registerValidation, AuthController.register);

// Login
authRouter.post('/login', loginValidation, AuthController.login);

// Me
authRouter.get('/me', tokenValidation, AuthController.getMe);

export default authRouter;