import Owner from './ownerModel.mjs';
import Car from '../car/carModel.mjs';
import MongooseCRUDManager from '../MongooseCRUDManager.mjs';

class OwnersDBService extends MongooseCRUDManager {
	constructor() {
		super(Owner); // Pass the Owner model to the parent class
	}

	// Delete an owner and their associated cars
	async deleteById(id) {
		try {
			await Car.deleteMany({ owner: id }); // Delete all cars associated with the owner
			return await super.deleteById(id); // Delete the owner
		} catch (error) {
			console.error('Error deleting owner and associated cars:', error);
			throw new Error(`Error deleting owner: ${error.message}`);
		}
	}
}

export default new OwnersDBService();
