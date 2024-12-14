import express from 'express';
import UserController from '../controllers/userController.mjs';
import validateRequest from '../services/validate-request-handler.mjs';
import userValidationSchema from '../validation/userValidationSchema.mjs';

const router = express.Router();

router.get('/register', UserController.registerForm);

router.post(
	'/register',
	validateRequest('register', userValidationSchema),
	UserController.registerUser
);

export default router;
