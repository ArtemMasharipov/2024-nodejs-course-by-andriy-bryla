import CarsDBService from '../models/car/carsDBService.mjs';
import OwnersDBService from '../models/owner/ownersDBService.mjs';
import fs from 'fs/promises';
import path from 'path';
import { handleError } from '../services/error-handler.mjs';

const NO_PHOTO_PATH = path.resolve('public/images/no_photo.jpg');

const renderCarForm = async (res, car, errors = []) => {
	try {
		const owners = await OwnersDBService.getList();
		res.render('cars/car_form', { car, owners, errors });
	} catch {
		handleError(res, 'Failed to load form data');
	}
};

const getDefaultImageBase64 = async () => {
	const buffer = await fs.readFile(NO_PHOTO_PATH);
	return `data:image/jpeg;base64,${buffer.toString('base64')}`;
};

export const getAllCars = async (req, res) => {
	try {
		const cars = await CarsDBService.getList();
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
		const file = req.file;
		const imgBase64 = file
			? `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
			: await getDefaultImageBase64();

		await CarsDBService.addCar({ ...req.body, imgBase64 });
		res.redirect('/cars');
	} catch (error) {
		console.error(error);
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

		const imgBase64 = req.file
			? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
			: car.imgBase64;

		await CarsDBService.updateCar(req.params.id, { ...req.body, imgBase64 });
		res.redirect('/cars');
	} catch (error) {
		console.error('Error updating car:', error);
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
