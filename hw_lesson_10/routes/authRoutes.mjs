import express from 'express';
import AuthController from '../controllers/authController.mjs';
import validateRequest from '../services/validate-request-handler.mjs';
import authValidationSchema from '../validation/authValidationSchema.mjs';

const router = express.Router();

router.get('/login', AuthController.showLoginForm);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

router.get('/register', AuthController.showRegistrationForm);
router.post(
	'/register',
	authValidationSchema,
	validateRequest('register', null),
	AuthController.register
);

export default router;
