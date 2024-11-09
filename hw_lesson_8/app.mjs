// ==============================================================================================
//  Урок №8. MongoDB. Mongoose. Продовження
// ========================================== Задача ============================================
// 1)додати до кожного елемента даних у вашому проєкті поле «owner» - де зберігається id властника 
// (самі власники зберігається у окремій колекції «owners» (піб власника, адерса)). Організувати 
// вибірку даних з відображення інформації про власників у списку елементів даних
// 2)розмістити базу даних у “Atlas” та пов’язати з здеплоєним проєктом 
// (вказати список валідних IP адрес)
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