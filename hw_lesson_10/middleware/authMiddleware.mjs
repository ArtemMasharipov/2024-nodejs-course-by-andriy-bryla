export function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/auth/login');
}

export function ensureAdmin(req, res, next) {
	if (req.isAuthenticated() && req.user.role.name === 'admin') return next();
	res.status(403).send('Forbidden: Admins only');
}
