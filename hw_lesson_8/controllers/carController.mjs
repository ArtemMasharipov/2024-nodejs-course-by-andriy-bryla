import CarsDBService from '../models/car/carsDBService.mjs';
import OwnersDBService from '../models/owner/ownersDBService.mjs';

const handleError = (res, errorMessage = 'An error occurred', status = 500) => {
	res.status(status).send(errorMessage);
};

const renderCarForm = async (res, car, errors = []) => {
	try {
		const owners = await OwnersDBService.getList();
		console.log('Fetched owners for creating car:', owners);
		res.render('cars/car_form', { car, owners, errors });
	} catch {
		handleError(res, 'Failed to load form data');
	}
};

export const getAllCars = async (req, res) => {
	try {
		const cars = await CarsDBService.getList();
		console.log('Fetched cars:', cars);  // Add this log
		res.render('cars/car_list', { cars });
	} catch {
		handleError(res, 'Failed to fetch cars');
	}
};

export const getCarDetails = async (req, res) => {
	try {
		const car = await CarsDBService.getCarById(req.params.id);
		if (!car) return handleError(res, 'Car not found', 404);
		res.render('cars/car_details', { car });
	} catch {
		handleError(res, 'Failed to fetch car details');
	}
};

export const showCreateForm = (req, res) => renderCarForm(res, null);

export const createCar = async (req, res) => {
	try {
		const imgSrc = req.file?.filename || null;
		await CarsDBService.addCar({ ...req.body, imgSrc });
		res.redirect('/cars');
	} catch {
		await renderCarForm(res, req.body, [{ msg: 'Failed to create car' }]);
	}
};

export const showEditForm = async (req, res) => {
	try {
		const car = await CarsDBService.getCarById(req.params.id);
		if (!car) return handleError(res, 'Car not found', 404);
		await renderCarForm(res, car);
	} catch {
		handleError(res, 'Failed to load edit form');
	}
};

export const updateCar = async (req, res) => {
	try {
		const car = await CarsDBService.getCarById(req.params.id);
		if (!car) return handleError(res, 'Car not found', 404);

		const imgSrc = req.file?.filename || car.imgSrc;
		await CarsDBService.updateCar(req.params.id, { ...req.body, imgSrc });
		res.redirect('/cars');
	} catch {
		await renderCarForm(res, req.body, [{ msg: 'Failed to update car' }]);
	}
};

export const deleteCar = async (req, res) => {
	try {
		await CarsDBService.deleteCar(req.params.id);
		res.redirect('/cars');
	} catch {
		handleError(res, 'Failed to delete car');
	}
};
