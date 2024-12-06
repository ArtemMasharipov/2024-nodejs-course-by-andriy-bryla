import User from '../user/userModel.mjs';
import bcrypt from 'bcryptjs';
import Role from './roleModel.mjs';
import MongooseCRUDManager from '../MongooseCRUDManager.mjs';

class RolesDBService extends MongooseCRUDManager {
	constructor() {
		super(Role);
	}

	/**
	 * Initialize a single role if it does not exist.
	 * @param {string} roleName - The name of the role to initialize.
	 * @returns {Promise<Object>} - The role document.
	 */
	async initializeRole(roleName) {
		try {
			const existingRole = await this.model.findOne({ name: roleName });
			if (!existingRole) {
				const createdRole = await this.create({ name: roleName });
				console.log(`Role "${roleName}" initialized.`);
				return createdRole;
			}
			console.log(`Role "${roleName}" already exists.`);
			return existingRole;
		} catch (error) {
			console.error(`Error initializing role "${roleName}":`, error);
			throw new Error(`Failed to initialize role "${roleName}".`);
		}
	}

	/**
	 * Initialize the default admin user if it does not exist.
	 * @param {string} email - Admin email.
	 * @param {string} password - Admin password.
	 * @param {ObjectId} adminRoleId - ID of the admin role.
	 */
	async initializeAdmin(email, password, adminRoleId) {
		try {
			const existingAdmin = await User.findOne({ email });
			if (existingAdmin) {
				console.log(`Admin with email "${email}" already exists.`);
				return;
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			await User.create({
				email,
				password: hashedPassword,
				role: adminRoleId,
			});
			console.log(`Admin initialized with email: ${email}`);
		} catch (error) {
			console.error('Error initializing admin user:', error);
			throw new Error('Failed to initialize admin user.');
		}
	}

	/**
	 * Initialize default roles (Admin, User, Guest) and a default admin user.
	 */
	async initializeDefaultRolesAndAdmin() {
		try {
			const defaultRoles = ['admin', 'user', 'guest'];

			// Initialize roles in parallel for efficiency
			const roles = await Promise.all(
				defaultRoles.map((roleName) => this.initializeRole(roleName))
			);

			// Find the admin role
			const adminRole = roles.find((role) => role.name === 'admin');
			if (!adminRole) throw new Error('Admin role could not be found.');

			// Initialize the default admin
			await this.initializeAdmin(
				process.env.DEFAULT_ADMIN_EMAIL,
				process.env.DEFAULT_ADMIN_PASSWORD,
				adminRole._id
			);
		} catch (error) {
			console.error('Error initializing default roles and admin:', error);
			throw new Error('Initialization failed.');
		}
	}
}

export default new RolesDBService();
