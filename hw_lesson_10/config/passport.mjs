import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import UsersDBService from '../models/user/UsersDBService.mjs';

passport.use(
	new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			const user = await UsersDBService.findOne({ email }, {}, ['role']);
			if (!user) {
				console.log('Authentication failed: User not found');
				return done(null, false, { message: 'Invalid email or password' });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				console.log('Authentication failed: Incorrect password');
				return done(null, false, { message: 'Invalid email or password' });
			}

			console.log('Authentication successful:', user.email);
			return done(null, user);
		} catch (error) {
			console.error('Authentication error:', error);
			return done(error);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await UsersDBService.findOne({ _id: id }, {}, ['role']);
		if (!user) {
			console.log('Deserialization failed: User not found');
			return done(null, false);
		}
		console.log('Deserialized user:', user.email);
		done(null, user);
	} catch (error) {
		console.error('Deserialization error:', error);
		done(error);
	}
});

export default passport;
