import { readProducts, writeProducts } from '../data/helpers/productService.mjs';

export const showAddProductForm = (req, res) => {
	res.render('addProduct');
};

export const addProduct = async (req, res) => {
	const { name, price, description } = req.body;

	try {
		const products = await readProducts();
		const newProduct = { id: Date.now(), name, price, description };
		products.push(newProduct);
		await writeProducts(products);
		res.redirect('/products');
	} catch (error) {
		console.error('Error adding product:', error);
		res.status(500).send('Server Error');
	}
};

export const showProducts = async (req, res) => {
	try {
		const products = await readProducts();
		res.render('products', { products });
	} catch (error) {
		console.error('Error retrieving products:', error);
		res.status(500).send('Server Error');
	}
};
