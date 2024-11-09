import Car from './carModel.mjs';

class CarsDBService {
	static async getList() {
		try {
			const cars = await Car.find().exec();
			return cars || [];
		} catch (error) {
			console.error('Error fetching cars:', error);
			return [];
		}
	}

	static async getCarById(id) {
		try {
			const car = await Car.findById(id).exec();
			return car;
		} catch (error) {
			console.error('Error fetching car by ID:', error);
			return null;
		}
	}

	static async addCar(car) {
		const newCar = new Car({ ...car });
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
			return car;
		} catch (error) {
			console.error('Error updating car:', error);
			return null;
		}
	}

	static async deleteCar(id) {
		try {
			const car = await Car.findByIdAndDelete(id);
			return car;
		} catch (error) {
			console.error('Error deleting car:', error);
			return null;
		}
	}
}

export default CarsDBService;
