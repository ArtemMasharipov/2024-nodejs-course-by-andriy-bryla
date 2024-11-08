import { v4 as uuidv4 } from 'uuid';
import { getBooks, getBookById, saveBooks } from '../models/bookModel.mjs';

const getAllBooks = async (req, res) => {
	const books = await getBooks();
	res.render('books/book_list', { books });
};

const getBookDetails = async (req, res) => {
	const book = await getBookById(req.params.id);
	if (!book) return res.status(404).json({ error: 'Book not found' });
	res.render('books/book_details', { book });
};

const showCreateForm = (req, res) => {
	res.render('books/book_form', { book: null });
};

const createBook = async (req, res) => {
	const books = await getBooks();
	const newBook = { id: uuidv4(), ...req.body };
	books.push(newBook);
	await saveBooks(books);
	res.redirect('/books');
};

const showEditForm = async (req, res) => {
	const book = await getBookById(req.params.id);
	if (!book) return res.status(404).json({ error: 'Book not found' });
	res.render('books/book_form', { book });
};

const updateBook = async (req, res) => {
	const books = await getBooks();
	const bookIndex = books.findIndex(book => book.id === req.params.id);
	if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });

	books[bookIndex] = { ...books[bookIndex], ...req.body };
	await saveBooks(books);
	res.redirect('/books');
};

const deleteBook = async (req, res) => {
	const books = await getBooks();
	const updatedBooks = books.filter(book => book.id !== req.params.id);
	await saveBooks(updatedBooks);
	res.redirect('/books');
};

export { getAllBooks, getBookDetails, showCreateForm, createBook, showEditForm, updateBook, deleteBook };