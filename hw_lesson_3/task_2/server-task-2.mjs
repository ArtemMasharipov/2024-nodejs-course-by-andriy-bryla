// ========================================== Задача 2 ==========================================
// Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”) 
// повертає створені HTML документи.
// =============================================================================================== 

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/:page?', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', `${req.params.page || 'index'}.html`), (err) => {
		if (err) res.status(404).send('Page not found');
	});
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
