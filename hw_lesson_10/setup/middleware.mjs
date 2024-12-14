import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import passport from '../config/passport.mjs';
import connectFlash from 'connect-flash';

export const setupMiddleware = (app) => {
	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static('public'));
	app.use(express.static('uploads'));
	app.use(methodOverride('_method'));
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(connectFlash());

	app.use((req, res, next) => {
		res.locals.user = req.user || null;
		next();
	});
};
