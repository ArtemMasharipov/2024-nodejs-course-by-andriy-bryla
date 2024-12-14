import Role from '../role/roleModel.mjs';
import MongooseCRUDManager from '../MongooseCRUDManager.mjs';
import User from './userModel.mjs';

class UsersDBService extends MongooseCRUDManager {
	constructor() {
		super(User);
	}

	async createUser(email, password, roleName = 'user') {
		const existingUser = await this.model.findOne({ email });
		if (existingUser) throw new Error('User with this email already exists.');

		const role = await Role.findOne({ name: roleName });
		if (!role) throw new Error(`Role "${roleName}" does not exist.`);

		return this.create({ email, password, role: role._id });
	}

	async getUsersList(filters = {}) {
		return this.getList(filters, { password: 0 }, ['role']);
	}
}

export default new UsersDBService();
