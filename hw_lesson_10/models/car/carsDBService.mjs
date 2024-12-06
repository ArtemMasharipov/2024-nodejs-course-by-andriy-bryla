import Car from './carModel.mjs';
import MongooseCRUDManager from '../MongooseCRUDManager.mjs';

class CarsDBService extends MongooseCRUDManager {
	constructor() {
		super(Car); // Pass the Car model to the parent class
	}

	// Fetch cars with populated owner details
	async getList(filters = {}) {
		try {
			return await super.getList(filters, null, [
				{
					fieldForPopulation: 'owner',
					requiredFieldsFromTargetObject: 'fullName address',
				},
			]);
		} catch (error) {
			console.error('Error fetching cars:', error);
			return [];
		}
	}
}

export default new CarsDBService();
