import express from 'express';
import my_links from '../data/my_links.json' assert { type: 'json' };
import aboutData from '../data/about.json' assert { type: 'json' };
import newsData from '../data/news.json' assert { type: 'json' };
import { generateResponse, sendHtmlFile } from '../data/helpers.mjs';

const router = express.Router();

router.get('/', (req, res) => sendHtmlFile('index', res));
router.get('/goals', (req, res) => sendHtmlFile('goals', res));
router.get('/about', (req, res) => res.json(aboutData));
router.get('/news', (req, res) => res.json(newsData));

router.get('/info/:myLinks', (req, res) => {
	const { myLinks } = req.params;
	const response = generateResponse(myLinks, my_links.links);

	if (response) {
		res.send(response);
	} else {
		res.status(404).send('Invalid parameter. Try sites, films, or me.');
	}
});

export default router;
