import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateLinksList = (links) =>
	`<ul>${links.map(link => `<li>${link}</li>`).join('')}</ul>`;

export const generateResponse = (type, links) => {
	switch (type) {
		case 'sites':
			return `<h1>Favorite Sites</h1>${generateLinksList(links.sites)}`;
		case 'films':
			return `<h1>Favorite Online Cinemas</h1>${generateLinksList(links.films)}`;
		case 'me':
			return `<h1>About Me</h1><p>${links.me}</p>`;
		default:
			return null;
	}
};

export const sendHtmlFile = (file, res) =>
	res.sendFile(path.join(__dirname, `../public/${file}.html`), (err) => {
		if (err) res.status(404).send('Page not found');
	});
