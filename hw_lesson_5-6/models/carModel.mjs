import DataFileManager from '../services/data-file-manager.mjs';
import { v4 as uuidv4 } from 'uuid';

const dataFileManager = new DataFileManager('data/cars.json');

const getCars = async () => {
	return dataFileManager.loadData();
};

const getCarById = async (id) => {
	return dataFileManager.getItemById(id);
};

const addCar = async (car) => {
	const newCar = { id: uuidv4(), ...car };
	return dataFileManager.addItem(newCar);
};

const updateCar = async (id, updatedCar) => {
	return dataFileManager.updateItemById(id, updatedCar);
};

const deleteCar = async (id) => {
	return dataFileManager.deleteItemById(id);
};

export default {
	getCars,
	getCarById,
	addCar,
	updateCar,
	deleteCar
};
