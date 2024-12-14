import express from 'express';
import asyncHandler from 'express-async-handler';
import {
	getAllRoles,
	getRoleDetails,
	createRole,
	updateRole,
	deleteRole,
} from '../controllers/roleController.mjs';
import validateRequest from '../services/validate-request-handler.mjs';
import roleValidationSchema from '../validation/roleValidationSchema.mjs';
import { ensureAdmin } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', ensureAdmin, asyncHandler(getAllRoles));
router.get('/:id', ensureAdmin, asyncHandler(getRoleDetails));
router.post('/', ensureAdmin, validateRequest(roleValidationSchema), asyncHandler(createRole));
router.put('/:id', ensureAdmin, validateRequest(roleValidationSchema), asyncHandler(updateRole));
router.delete('/:id', ensureAdmin, asyncHandler(deleteRole));

export default router;
