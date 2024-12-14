import indexRouter from '../routes/index.mjs';
import authRoutes from '../routes/authRoutes.mjs';
import userRoutes from '../routes/userRoutes.mjs';
import carRoutes from '../routes/carRoutes.mjs';
import ownerRoutes from '../routes/ownerRoutes.mjs';

export const setupRoutes = (app) => {
	app.use('/', indexRouter);
	app.use('/auth', authRoutes);
	app.use('/users', userRoutes);
	app.use('/cars', carRoutes);
	app.use('/owners', ownerRoutes);
};
