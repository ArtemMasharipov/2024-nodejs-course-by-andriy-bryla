import User from './User.mjs';
import bcrypt from 'bcryptjs';
import Role from './roleModel.mjs';
import MongooseCRUDManager from '../MongooseCRUDManager.mjs';

class UsersDBService extends MongooseCRUDManager {
	constructor() {
		super(User);
	}

	/**
	 * Create a new user with role validation and password hashing.
	 * @param {string} email - User's email.
	 * @param {string} password - User's password.
	 * @param {string} roleName - Role name (e.g., 'user', 'admin').
	 * @returns {Promise<Object>} - The created user document.
	 */
	async createUser(email, password, roleName) {
		try {
			// Check if user already exists
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				throw new Error(`User with email "${email}" already exists.`);
			}

			// Find the role by name
			const roleDocument = await Role.findOne({ name: roleName });
			if (!roleDocument) {
				throw new Error(`Role "${roleName}" does not exist.`);
			}

			// Hash the password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create the user
			const user = await User.create({
				email,
				password: hashedPassword,
				role: roleDocument._id,
			});
			console.log(`User created with email: ${email} and role: ${roleName}`);
			return user;
		} catch (error) {
			console.error('Error creating user:', error);
			throw new Error('Failed to create user.');
		}
	}
}

export default new UsersDBService();
