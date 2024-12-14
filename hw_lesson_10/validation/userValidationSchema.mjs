import { checkSchema } from 'express-validator';

const userValidationSchema = checkSchema({
	email: {
		notEmpty: {
			errorMessage: 'Email is required.',
		},
		isEmail: {
			errorMessage: 'Please provide a valid email address.',
		},
		normalizeEmail: true, // Normalize email for consistency
	},
	password: {
		notEmpty: {
			errorMessage: 'Password is required.',
		},
		isLength: {
			options: { min: 6 },
			errorMessage: 'Password must be at least 6 characters long.',
		},
	},
});

export default userValidationSchema;
