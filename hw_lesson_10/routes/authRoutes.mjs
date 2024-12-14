import { Router } from 'express';
import AuthController from '../controllers/authController.mjs';

const router = Router();

router.get('/login', AuthController.renderLogin);
router.post('/login', AuthController.login);

router.get('/logout', AuthController.logout);

export default router;
