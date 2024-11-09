import CarsDBService from '../models/carsDBService.mjs';

const handleError = (res, errorMessage = 'An error occurred', status = 500) => {
	res.status(status).send(errorMessage);
};

export const getAllCars = async (req, res) => {
	try {
		const cars = await CarsDBService.getList();
		res.render('cars/car_list', { cars });
	} catch (err) {
		handleError(res, 'Failed to fetch cars');
	}
};

export const getCarDetails = async (req, res) => {
	try {
		const car = await CarsDBService.getCarById(req.params.id);
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
		const newCar = await CarsDBService.addCar({ ...req.body, imgSrc });
		res.redirect('/cars');
	} catch (err) {
		res.render('cars/car_form', { car: null, errors: [{ msg: 'Failed to create car' }] });
	}
};

export const showEditForm = async (req, res) => {
	try {
		const car = await CarsDBService.getCarById(req.params.id);
		if (!car) return handleError(res, 'Car not found', 404);
		res.render('cars/car_form', { car, errors: [] });
	} catch (err) {
		handleError(res, 'Failed to load edit form');
	}
};

export const updateCar = async (req, res) => {
	try {
		const car = await CarsDBService.getCarById(req.params.id);
		if (!car) return handleError(res, 'Car not found', 404);

		const imgSrc = req.file?.filename || car.imgSrc;
		const updatedCar = await CarsDBService.updateCar(req.params.id, { ...req.body, imgSrc });

		res.redirect('/cars');
	} catch (err) {
		res.render('cars/car_form', { car, errors: [{ msg: 'Failed to update car' }] });
	}
};

export const deleteCar = async (req, res) => {
	try {
		await CarsDBService.deleteCar(req.params.id);
		res.redirect('/cars');
	} catch (err) {
		handleError(res, 'Failed to delete car');
	}
};
