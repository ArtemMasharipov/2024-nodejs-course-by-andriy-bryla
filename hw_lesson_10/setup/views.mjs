import path from 'path';
import { fileURLToPath } from 'url';

export const setupViews = (app) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'ejs');
};
