// ==============================================================================================
//  Урок №7. MongoDB. Mongoose
// ========================================== Задача ============================================
// До попереднього проєкту, де ви робили валідацію додати базу даних згідно розглянутої 
// на уроці схеми.
// ----------------------------------------------------------------------------------------------
// Розробити додаток для автопарку(марка авто, рік випуску, номер, зображення) 
// з такими функціональними можливостями:
// 1)додавання транспортного засобу
// 2) редагування
// 3) видалення
// 4)виведення списку
// Також є статичні сторінки:
// Home
// about
// ==============================================================================================
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.mjs';
import carRoutes from './routes/carRoutes.mjs';

import connectDB from './db/connectDB.mjs'
const app = express()
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
connectDB()

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(methodOverride('_method'));

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRouter);
app.use('/cars', carRoutes);

// 404 error handler
app.use((req, res, next) => {
	res.status(404).render('error', { message: 'Page not found', error: {} });
});

// Start server
export default app;