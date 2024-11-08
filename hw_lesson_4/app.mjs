// Задача. За прикладом, який ми розглянули на уроці розробити додаток з такими операціями стосовно контексту, який ви виберете:
// відображення списку елементів
// відображення детальної інформації про елемент маючи id
// додавання нового елемента
// потім додамо редагування
// потім додамо видалення

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.mjs';
import bookRoutes from './routes/bookRoutes.mjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRouter);
app.use('/books', bookRoutes);

// 404 error handler
app.use((req, res, next) => {
	res.status(404).render('error', { message: 'Page not found', error: {} });
});

export default app;