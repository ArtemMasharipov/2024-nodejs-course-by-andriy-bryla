import express from 'express';
import asyncHandler from 'express-async-handler';
import {
	getAllOwners,
	getOwnerDetails,
	showCreateOwnerForm,
	createOwner,
	showEditOwnerForm,
	updateOwner,
	deleteOwner,
} from '../controllers/ownerController.mjs';
import validateRequest from '../services/validate-request-handler.mjs';
import ownerValidationSchema from '../validation/ownerValidationSchema.mjs';
import { ensureAuthenticated, ensureAdmin } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', asyncHandler(getAllOwners));
router.get('/new', ensureAuthenticated, showCreateOwnerForm);
router.post(
	'/',
	ensureAuthenticated,
	validateRequest('owners/owner_form', ownerValidationSchema),
	asyncHandler(createOwner)
);
router.get('/:id', asyncHandler(getOwnerDetails));
router.get('/:id/edit', ensureAdmin, asyncHandler(showEditOwnerForm));
router.put(
	'/:id',
	ensureAdmin,
	validateRequest('owners/owner_form', ownerValidationSchema),
	asyncHandler(updateOwner)
);
router.delete('/:id', ensureAdmin, asyncHandler(deleteOwner));

export default router;
