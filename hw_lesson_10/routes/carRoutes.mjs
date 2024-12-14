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
import OwnersDBService from '../models/owner/OwnersDBService.mjs';
import { ensureAuthenticated, ensureAdmin } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', asyncHandler(getAllCars));
router.get('/new', ensureAuthenticated, showCreateForm);
router.post(
	'/',
	ensureAuthenticated,
	upload,
	carValidationSchema,
	validateRequest('cars/car_form', async () => ({
		owners: await OwnersDBService.getList(),
	})),
	asyncHandler(createCar)
);
router.get('/:id', asyncHandler(getCarDetails));
router.get('/:id/edit', ensureAdmin, asyncHandler(showEditForm));
router.put(
	'/:id',
	ensureAdmin,
	upload,
	carValidationSchema,
	validateRequest('cars/car_form', async () => ({
		owners: await OwnersDBService.getList(),
	})),
	asyncHandler(updateCar)
);
router.delete('/:id', ensureAdmin, asyncHandler(deleteCar));

export default router;
