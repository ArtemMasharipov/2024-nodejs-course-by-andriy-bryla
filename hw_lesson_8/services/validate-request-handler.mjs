import { validationResult } from 'express-validator';
import OwnersDBService from '../models/owner/ownersDBService.mjs';

const validateRequest = (schema, formType) => [
	schema,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			if (formType === 'car') {
				const car = req.body;
				const owners = await OwnersDBService.getList();
				return res.status(400).render('cars/car_form', {
					errors: errors.array(),
					car: { ...car, id: req.params.id },
					owners
				});
			} else if (formType === 'owner') {
				const owner = req.body;
				return res.status(400).render('owners/owner_form', {
					errors: errors.array(),
					owner: { ...owner, _id: req.params.id }
				});
			}
		}
		next();
	},
];

export default validateRequest;