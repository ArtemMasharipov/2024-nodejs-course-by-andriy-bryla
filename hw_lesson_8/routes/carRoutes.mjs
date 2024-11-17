import express from 'express';
import validateRequest from '../services/validate-request-handler.mjs';
import carValidationSchema from '../validation/carValidationSchema.mjs';
import asyncHandler from 'express-async-handler';
import {
	getAllCars,
	getCarDetails,
	showCreateForm,
	createCar,
	showEditForm,
	updateCar,
	deleteCar
} from '../controllers/carController.mjs';
import upload from '../services/upload-handler.mjs';

const router = express.Router();

// Routes
router.get('/', asyncHandler(getAllCars));
router.get('/new', showCreateForm);
router.post('/', upload.single('image'), validateRequest(carValidationSchema, 'car'), asyncHandler(createCar));
router.get('/:id', asyncHandler(getCarDetails));
router.get('/:id/edit', asyncHandler(showEditForm));
router.put('/:id', upload.single('image'), validateRequest(carValidationSchema, 'car'), asyncHandler(updateCar));
router.delete('/:id', asyncHandler(deleteCar));

export default router;
