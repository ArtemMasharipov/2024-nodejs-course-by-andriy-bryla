import UsersDBService from '../services/UsersDBService.mjs';
import { handleError } from '../services/error-handler.mjs';
class UserController {
	// Get the list of users
	static async getAllUsers(req, res) {
		try {
			const users = await UsersDBService.getList();
			res.status(200).json(users);
		} catch (error) {
			handleError(res, error.message);
		}
	}

	// Get a specific user by ID
	static async getUserById(req, res) {
		try {
			const user = await UsersDBService.getById(req.params.id);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.status(200).json(user);
		} catch (error) {
			handleError(res, error.message);
		}
	}

	// Create a new user
	static async createUser(req, res) {
		try {
			const newUser = await UsersDBService.create(req.body);
			res.status(201).json(newUser);
		} catch (error) {
			handleError(res, error.message);
		}
	}

	// Update an existing user
	static async updateUser(req, res) {
		try {
			const updatedUser = await UsersDBService.update(req.params.id, req.body);
			if (!updatedUser) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.status(200).json(updatedUser);
		} catch (error) {
			handleError(res, error.message);
		}
	}

	// Delete a user
	static async deleteUser(req, res) {
		try {
			const deletedUser = await UsersDBService.deleteById(req.params.id);
			if (!deletedUser) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.status(200).json({ message: 'User deleted successfully' });
		} catch (error) {
			handleError(res, error.message);
		}
	}
}

export default UserController;
