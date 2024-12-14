import UsersDBService from '../user/UsersDBService.mjs';
import Role from './roleModel.mjs';
import MongooseCRUDManager from '../MongooseCRUDManager.mjs';

class RolesDBService extends MongooseCRUDManager {
	constructor() {
		super(Role);
	}

	async initializeRole(roleName) {
		return this.model.findOneAndUpdate(
			{ name: roleName },
			{},
			{ new: true, upsert: true }
		);
	}

	async initializeDefaultRolesAndAdmin() {
		const roles = await Promise.all(
			['admin', 'user', 'guest'].map((roleName) => this.initializeRole(roleName))
		);

		const adminRole = roles.find((role) => role.name === 'admin');
		if (!adminRole) throw new Error('Admin role not found.');

		const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
		const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;

		try {
			await UsersDBService.createUser(adminEmail, adminPassword, 'admin');
			console.log(`Admin created: ${adminEmail}`);
		} catch (error) {
			if (error.message.includes('User with this email already exists.')) {
				console.log(`Admin already exists: ${adminEmail}`);
			} else {
				throw error;
			}
		}
	}
}

export default new RolesDBService();
