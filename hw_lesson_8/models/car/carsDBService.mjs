import Car from './carModel.mjs';
import fs from 'fs/promises';
import path from 'path';

class CarsDBService {
	static async getList() {
		try {
			const cars = await Car.find()
				.populate('owner', 'fullName address')
				.exec();
			return cars || [];
		} catch (error) {
			console.error('Error fetching cars:', error);
			return [];
		}
	}

	static async getCarById(id) {
		try {
			const car = await Car.findById(id)
				.populate('owner', 'fullName address')
				.exec();
			if (!car) {
				console.error(`Car with id ${id} not found`);
				return null;
			}
			return car;
		} catch (error) {
			console.error('Error fetching car by ID:', error);
			return null;
		}
	}

	static async addCar(carData) {
		const newCar = new Car({ ...carData });
		try {
			await newCar.save();
			return newCar;
		} catch (error) {
			console.error('Error adding car:', error);
			return null;
		}
	}

	static async updateCar(id, updatedCar) {
		try {
			const car = await Car.findByIdAndUpdate(id, updatedCar, {
				new: true,
				runValidators: true,
			});
			if (!car) {
				console.error(`Car with id ${id} not found`);
				return null;
			}
			return car;
		} catch (error) {
			console.error('Error updating car:', error);
			return null;
		}
	}

	static async deleteCar(id) {
		try {
			const car = await Car.findByIdAndDelete(id);
			if (!car) {
				console.error(`Car with id ${id} not found`);
				return null;
			}
			await CarsDBService.handleImageDeletion(car.imgSrc);
			return car;
		} catch (error) {
			console.error('Error deleting car:', error);
			return null;
		}
	}

	static async handleImageDeletion(imgSrc) {
		if (imgSrc) {
			try {
				await fs.unlink(path.resolve('uploads', imgSrc));
				console.log(`Image file ${imgSrc} successfully deleted.`);
			} catch (error) {
				console.error(`Error deleting image file: ${error.message}`);
			}
		}
	}
}

export default CarsDBService;
