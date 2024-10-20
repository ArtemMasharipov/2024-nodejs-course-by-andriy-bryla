import express from 'express';
import { showAddProductForm, addProduct, showProducts } from '../controllers/productController.mjs';

const router = express.Router();

router.get('/add', showAddProductForm);
router.post('/add', addProduct);
router.get('/', showProducts);

export default router;
