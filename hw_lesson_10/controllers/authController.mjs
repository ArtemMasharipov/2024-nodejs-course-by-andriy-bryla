import passport from 'passport';
import AuthService from '../services/authService.mjs';

class AuthController {
	static showLoginForm(req, res) {
		res.render('login', {
			email: req.body?.email || '', 
			messages: req.flash('error') 
		});
	}


	static login(req, res, next) {
		passport.authenticate('local', (err, user, info) => {
			if (err) return next(err);
			if (!user) {
				req.flash('error', info.message);
				return res.redirect('/auth/login');
			}
			req.logIn(user, (err) => {
				if (err) return next(err);
				console.log('Logged in user:', user); 
				return res.redirect('/cars');
			});
		})(req, res, next);
	}


	static logout(req, res, next) {
		req.logout(err => {
			if (err) return next(err);
			req.flash('success', 'You have logged out successfully.');
			res.redirect('/auth/login');
		});
	}

	static showRegistrationForm(req, res) {
		res.render('register', { errors: [] });
	}

	static async register(req, res) {
		try {
			const { email, password, role } = req.body;

			// Use the AuthService to handle registration logic
			await AuthService.register({ email, password, role });

			req.flash('success', 'Registration successful. Please log in.');
			res.redirect('/auth/login');
		} catch (error) {
			console.error('Error during registration:', error);
			const errors = [{ msg: error.message || 'Registration failed. Please try again.' }];
			res.status(400).render('register', { errors });
		}
	}
}

export default AuthController;
