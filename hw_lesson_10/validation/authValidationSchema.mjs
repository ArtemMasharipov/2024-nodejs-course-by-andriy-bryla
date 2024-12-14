import { checkSchema } from 'express-validator';

const authValidationSchema = checkSchema({
	email: {
		isEmail: { errorMessage: 'Invalid email address' },
		trim: true,
		normalizeEmail: true,
	},
	password: {
		isLength: {
			options: { min: 6 },
			errorMessage: 'Password must be at least 6 characters',
		},
		trim: true,
	},
});

export default authValidationSchema;
