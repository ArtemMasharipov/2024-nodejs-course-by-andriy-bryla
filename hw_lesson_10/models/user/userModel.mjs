import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: 6,
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: 'Role', // Reference to the Role model
		required: true,
		default: null, // Default will be set programmatically in the service
	},
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Compare passwords
userSchema.methods.isPasswordMatch = function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
