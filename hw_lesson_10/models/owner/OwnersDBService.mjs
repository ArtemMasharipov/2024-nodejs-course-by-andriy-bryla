import Owner from './ownerModel.mjs';
import Car from '../car/carModel.mjs';


class OwnersDBService {
	static async getList() {
		try {
			return await Owner.find().exec();
		} catch (error) {
			console.error('Error fetching owners:', error);
			return [];
		}
	}

	static async getById(id) {
		try {
			return await Owner.findById(id).exec();
		} catch (error) {
			console.error('Error fetching owner:', error);
			return null;
		}
	}

	static async create(ownerData) {
		try {
			const owner = new Owner(ownerData);
			return await owner.save();
		} catch (error) {
			console.error('Error creating owner:', error);
			throw error;
		}
	}

	static async updateOwner(id, ownerData) {
		try {
			const owner = await Owner.findByIdAndUpdate(id, ownerData, {
				new: true,
				runValidators: true,
			});
			return owner;
		} catch (error) {
			console.error('Error updating owner:', error);
			return null;
		}
	}

	static async deleteOwner(id) {
		try {
			await Car.deleteMany({ owner: id });

			const owner = await Owner.findByIdAndDelete(id);
			return owner;
		} catch (error) {
			console.error('Error deleting owner:', error);
			return null;
		}
	}
}

export default OwnersDBService;
