import { Router } from 'express';
import AuthController from '../controllers/authController.mjs';

const router = Router();

// Роуты для входа
router.get('/login', AuthController.renderLogin); // Форма входа
router.post('/login', AuthController.login); // Обработка входа

// Роут для выхода
router.get('/logout', AuthController.logout); // Обработка выхода

export default router;
