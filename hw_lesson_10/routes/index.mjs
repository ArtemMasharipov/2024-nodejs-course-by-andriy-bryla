import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Vehicle Fleet Management',
		user: req.user || null,
	});
});

router.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Us',
		user: req.user || null,
	});
});

export default router;
