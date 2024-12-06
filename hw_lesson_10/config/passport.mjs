import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user/userModel.mjs';
import bcrypt from 'bcryptjs';

// Define local strategy
passport.use(
	new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			// Find user by email and populate role
			const user = await User.findOne({ email }).populate('role');
			if (!user) {
				return done(null, false, { message: 'Invalid email or password' });
			}

			// Compare password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return done(null, false, { message: 'Invalid email or password' });
			}

			// Check if user is active (optional, if you track active status)
			if (!user.isActive) {
				return done(null, false, { message: 'Your account is inactive. Please contact support.' });
			}

			return done(null, user);
		} catch (error) {
			console.error('Error in LocalStrategy:', error);
			return done(error);
		}
	})
);

// Serialize user
passport.serializeUser((user, done) => {
	try {
		done(null, user.id); // Save user ID to the session
	} catch (error) {
		console.error('Error in serializeUser:', error);
		done(error);
	}
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id).populate('role'); // Retrieve user by ID
		if (!user) {
			return done(null, false, { message: 'User not found' });
		}
		done(null, user);
	} catch (error) {
		console.error('Error in deserializeUser:', error);
		done(error, null);
	}
});


export default passport;
