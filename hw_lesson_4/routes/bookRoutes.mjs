import express from 'express';
import asyncHandler from 'express-async-handler';
import {
	getAllBooks,
	getBookDetails,
	showCreateForm,
	createBook,
	showEditForm,
	updateBook,
	deleteBook
} from '../controllers/bookController.mjs';

const router = express.Router();

router.get('/', asyncHandler(getAllBooks));
router.get('/new', showCreateForm);
router.post('/', asyncHandler(createBook));
router.get('/:id', asyncHandler(getBookDetails));
router.get('/:id/edit', asyncHandler(showEditForm));
router.put('/:id', asyncHandler(updateBook));
router.delete('/:id', asyncHandler(deleteBook));

export default router;
