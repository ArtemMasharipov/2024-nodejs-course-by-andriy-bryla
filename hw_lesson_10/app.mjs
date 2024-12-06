import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import session from 'express-session';
import passport from './config/passport.mjs';
import connectFlash from 'connect-flash';

// Routes
import indexRouter from './routes/index.mjs';
import carRoutes from './routes/carRoutes.mjs';
import ownerRoutes from './routes/ownerRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';

// Database connection
import connectDB from './db/connectDB.mjs';
import RolesDBService from './models/role/rolesDBService.mjs';

// Initialize the application
const app = express();

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database setup
(async () => {
	try {
		await connectDB();
		await RolesDBService.initializeDefaultRolesAndAdmin();
		console.log('Roles and default admin initialized successfully.');
	} catch (error) {
		console.error('Failed to initialize roles and admin:', error);
		process.exit(1); // Exit the process with a failure code
	}
})();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(methodOverride('_method'));

// Session and Passport.js setup
app.use(
	session({
		secret: 'yourSecretKey',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

// Flash messages and user data middleware
app.use((req, res, next) => {
	console.log('User in session:', req.user);
	res.locals.user = req.user || null;
	next();
});

// Views configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes setup
app.use('/', indexRouter);
app.use('/auth', authRoutes);
app.use('/cars', carRoutes);
app.use('/owners', ownerRoutes);

// Error handling
app.use((req, res, next) => {
	res.status(404).render('error', { message: 'Page not found', error: {} });
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
