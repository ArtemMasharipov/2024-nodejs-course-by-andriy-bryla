import { checkSchema } from 'express-validator';

const carValidationSchema = checkSchema({
	brand: {
		trim: true,
		escape: true,
		isLength: {
			options: { min: 4, max: 50 },
			errorMessage: 'Car brand must be between 5 and 50 characters long.',
		},
		isAlphanumeric: {
			errorMessage: 'Car brand must be alphanumeric and contain no special characters.',
		},
	},
	year: {
		isNumeric: {
			errorMessage: 'Year must be a number.',
		},
		isLength: {
			options: { min: 4, max: 4 },
			errorMessage: 'Year must be a 4-digit number.',
		},
		custom: {
			options: (value) => {
				const currentYear = new Date().getFullYear();
				return value >= 1900 && value <= currentYear;
			},
			errorMessage: 'Year must be between 1900 and the current year.',
		},
	},
	plateNumber: {
		trim: true,
		escape: true,
		unique: true,
		isLength: {
			options: { min: 5, max: 15 },
			errorMessage: 'Plate number must be between 5 and 15 characters long.',
		},
		matches: {
			options: /^[A-Za-z0-9\s-]+$/,
			errorMessage: 'Plate number can only contain alphanumeric characters, spaces, and hyphens.',
		},
		
	},
	owner: {
		notEmpty: {
			errorMessage: 'Owner is required.',
		},
		isMongoId: {
			errorMessage: 'Invalid owner ID format.',
		}
	}
});

export default carValidationSchema;
