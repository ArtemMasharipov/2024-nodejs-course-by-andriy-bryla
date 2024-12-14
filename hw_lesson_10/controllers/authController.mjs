import passport from 'passport';

class AuthController {
	static renderLogin(req, res) {
		res.render('login', {
			user: req.user || null,
			errors: req.flash('error'),
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
				res.redirect('/cars');
			});
		})(req, res, next);
	}

	static logout(req, res, next) {
		req.logout((err) => {
			if (err) return next(err);
			req.flash('success', 'You have logged out successfully.');
			res.redirect('/auth/login');
		});
	}
}

export default AuthController;
