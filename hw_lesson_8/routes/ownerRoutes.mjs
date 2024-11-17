import express from 'express';
import validateRequest from '../services/validate-request-handler.mjs';
import ownerValidationSchema from '../validation/ownerValidationSchema.mjs';
import asyncHandler from 'express-async-handler';
import {
	getAllOwners,
	getOwnerDetails,
	showCreateOwnerForm,
	createOwner,
	showEditOwnerForm,
	updateOwner,
	deleteOwner
} from '../controllers/ownerController.mjs';

const router = express.Router();

router.get('/', asyncHandler(getAllOwners));
router.get('/new', showCreateOwnerForm);
router.post('/', validateRequest(ownerValidationSchema, 'owner'), asyncHandler(createOwner));
router.get('/:id', asyncHandler(getOwnerDetails));
router.get('/:id/edit', asyncHandler(showEditOwnerForm));
router.put('/:id', validateRequest(ownerValidationSchema, 'owner'), asyncHandler(updateOwner));
router.delete('/:id', asyncHandler(deleteOwner));

export default router;
