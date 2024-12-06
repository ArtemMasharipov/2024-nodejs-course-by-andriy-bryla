import User from '../models/user/userModel.mjs';
import Role from '../models/role/roleModel.mjs';
import bcrypt from 'bcryptjs';

class AuthService {
	static async register({email, password, role = 'user' }) {
		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new Error('Email is already in use');
		}

		// Find the role by name
		const roleDocument = await Role.findOne({ name: role });
		if (!roleDocument) {
			throw new Error('Invalid role specified');
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create and save the user
		const user = new User({
			email,
			password: hashedPassword,
			role: roleDocument._id,
		});
		await user.save();

		return user;
	}
}

export default AuthService;
