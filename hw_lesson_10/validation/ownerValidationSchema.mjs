import { checkSchema } from 'express-validator';

const ownerValidationSchema = checkSchema({
	fullName: {
		notEmpty: {
			errorMessage: 'Owner full name is required.',
		},
		isLength: {
			options: { min: 4, max: 100 },
			errorMessage: 'Owner full name must be between 5 and 100 characters long.',
		},
	},
	address: {
		notEmpty: {
			errorMessage: 'Owner address is required.',
		},
		isLength: {
			options: { min: 5, max: 200 },
			errorMessage: 'Owner address must be between 5 and 200 characters long.',
		},
	},
});

export default ownerValidationSchema;