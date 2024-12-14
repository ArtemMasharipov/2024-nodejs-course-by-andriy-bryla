import UsersDBService from '../models/user/UsersDBService.mjs';
import RolesDBService from '../models/role/RolesDBService.mjs';
import { validationResult } from 'express-validator';

class UserController {
	static async registerForm(req, res) {
		try {
			const user = req.user || null;
			res.render('register', {
				user,
				errors: [],
				data: {}, // Добавлено: для передачи пустых данных формы
			});
		} catch (err) {
			console.error('Error rendering register form:', err.message);
			res.status(500).json({ error: 'Failed to load registration form.' });
		}
	}

	static async registerUser(req, res) {
		const errors = validationResult(req);
		const data = req.body;

		if (!errors.isEmpty()) {
			return res.status(400).render('register', {
				errors: errors.array(),
				data,
				user: req.user || null,
			});
		}

		try {
			const role = await RolesDBService.findOne({ name: 'user' });
			if (!role) {
				throw new Error('Default role "guest" not found');
			}

			const dataObj = { ...data, role: role._id };
			await UsersDBService.create(dataObj);

			req.flash('success', 'Registration successful. Please log in.');
			res.redirect('/auth/login');
		} catch (err) {
			console.error('Error during user registration:', err.message);
			res.status(500).render('register', {
				errors: [{ msg: err.message }],
				data,
				user: req.user || null,
			});
		}
	}
}

export default UserController;
