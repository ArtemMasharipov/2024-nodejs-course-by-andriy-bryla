import express from 'express';
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
import validateRequest from '../services/validate-request-handler.mjs';
import ownerValidationSchema from '../validation/ownerValidationSchema.mjs';

const router = express.Router();

router.get('/', asyncHandler(getAllOwners));
router.get('/new', showCreateOwnerForm);
router.post(
	'/',
	validateRequest('owners/owner_form', ownerValidationSchema),
	asyncHandler(createOwner)
);
router.get('/:id', asyncHandler(getOwnerDetails));
router.get('/:id/edit', asyncHandler(showEditOwnerForm));
router.put(
	'/:id',
	validateRequest('owners/owner_form', ownerValidationSchema),
	asyncHandler(updateOwner)
);
router.delete('/:id', asyncHandler(deleteOwner));

export default router;
