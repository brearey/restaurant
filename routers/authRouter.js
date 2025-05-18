import express from 'express';
import * as AuthController from '../controllers/authController.js';
import checkAuth from '../utils/checkAuth.js';
import logger from '../utils/logger.js'
import { loginValidation, registerValidation } from '../utils/validations.js';
import * as dotenv from 'dotenv';
dotenv.config();

const authRouter = express.Router();

// Register
authRouter.post('/register', logger, registerValidation, AuthController.register);

// Login
authRouter.post('/login', logger, loginValidation, AuthController.login);

// Me
authRouter.get('/me', logger, checkAuth, AuthController.getMe);

export default authRouter;