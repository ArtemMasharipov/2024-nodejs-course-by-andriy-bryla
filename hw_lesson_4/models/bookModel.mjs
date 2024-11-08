import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'books.json');

const getBooks = async () => JSON.parse(await fs.readFile(dataPath, 'utf8'));

const getBookById = async (id) => (await getBooks()).find(book => book.id === id);

const saveBooks = async (books) => {
	await fs.writeFile(dataPath, JSON.stringify(books, null, 2), 'utf8');
};

export { getBooks, getBookById, saveBooks };
