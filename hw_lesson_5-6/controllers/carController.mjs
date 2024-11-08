import CarModel from '../models/carModel.mjs';

const handleError = (res, errorMessage = 'An error occurred', status = 500) => {
	res.status(status).send(errorMessage);
};

export const getAllCars = async (req, res) => {
	try {
		const cars = await CarModel.getCars();
		res.render('cars/car_list', { cars });
	} catch (err) {
		handleError(res, 'Failed to fetch cars');
	}
};

export const getCarDetails = async (req, res) => {
	try {
		const car = await CarModel.getCarById(req.params.id);
		if (!car) return handleError(res, 'Car not found', 404);
		res.render('cars/car_details', { car });
	} catch (err) {
		handleError(res, 'Failed to fetch car details');
	}
};

export const showCreateForm = (req, res) => {
	res.render('cars/car_form', { car: null, errors: [] });
};

export const createCar = async (req, res) => {
	try {
		const imgSrc = req.file?.filename || null;
		await CarModel.addCar({ ...req.body, imgSrc });
		res.redirect('/cars');
	} catch (err) {
		res.render('cars/car_form', { car: req.body, errors: [{ msg: 'Failed to create car' }] });
	}
};

export const showEditForm = async (req, res) => {
	try {
		const car = await CarModel.getCarById(req.params.id);
		if (!car) return handleError(res, 'Car not found', 404);
		res.render('cars/car_form', { car, errors: [] });
	} catch (err) {
		handleError(res, 'Failed to load edit form');
	}
};

export const updateCar = async (req, res) => {
	const car = await CarModel.getCarById(req.params.id);
	if (!car) return handleError(res, 'Car not found', 404);

	try {
		const imgSrc = req.file?.filename || car.imgSrc;
		await CarModel.updateCar(req.params.id, { ...req.body, imgSrc });
		res.redirect('/cars');
	} catch (err) {
		res.render('cars/car_form', { car, errors: [{ msg: 'Failed to update car' }] });
	}
};


export const deleteCar = async (req, res) => {
	try {
		await CarModel.deleteCar(req.params.id);
		res.redirect('/cars');
	} catch (err) {
		handleError(res, 'Failed to delete car');
	}
};