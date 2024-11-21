import express from 'express';
import asyncHandler from 'express-async-handler';
import {
	getAllCars,
	getCarDetails,
	showCreateForm,
	createCar,
	showEditForm,
	updateCar,
	deleteCar,
} from '../controllers/carController.mjs';
import upload from '../services/upload-handler.mjs';
import validateRequest from '../services/validate-request-handler.mjs';
import carValidationSchema from '../validation/carValidationSchema.mjs';
import OwnersDBService from '../models/owner/ownersDBService.mjs';

const router = express.Router();

router.get('/', asyncHandler(getAllCars));
router.get('/new', showCreateForm);
router.post(
	'/',
	upload,
	carValidationSchema,
	validateRequest('cars/car_form', async () => ({
		owners: await OwnersDBService.getList(),
	})),
	asyncHandler(createCar)
);
router.get('/:id', asyncHandler(getCarDetails));
router.get('/:id/edit', asyncHandler(showEditForm));
router.put(
	'/:id',
	upload,
	carValidationSchema,
	validateRequest('cars/car_form', async () => ({
		owners: await OwnersDBService.getList(),
	})),
	asyncHandler(updateCar)
);
router.delete('/:id', asyncHandler(deleteCar));

export default router;
