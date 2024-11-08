import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data/products.json');

export const readProducts = async () => {
	const data = await fs.readFile(dataPath, 'utf8');
	return JSON.parse(data);
};

export const writeProducts = async (products) => {
	await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
};
