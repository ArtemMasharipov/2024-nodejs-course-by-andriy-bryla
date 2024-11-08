import { validationResult } from 'express-validator';

const validateRequest = (schema) => [
	schema,
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const car = req.body;
			return res.status(400).render('cars/car_form', {
				errors: errors.array(),
				car: { ...car, id: req.params.id },
			});
		}
		next();
	},
];

export default validateRequest;
