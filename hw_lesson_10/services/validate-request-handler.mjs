import { validationResult } from 'express-validator';

const validateRequest = (formView, validationSchema, getAdditionalData = null) => [
    validationSchema,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const additionalData = getAdditionalData ? await getAdditionalData(req) : {};
            const data = {
                ...req.body,
                ...additionalData,
                errors: errors.array(),
            };
            return res.status(400).render(formView, data);
        }
        next();
    },
];

export default validateRequest;
