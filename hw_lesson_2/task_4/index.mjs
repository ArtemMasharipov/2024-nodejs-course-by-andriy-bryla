import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROUTES = {
	'/': 'index.html',
	'/coffee': 'coffee.html',
	'/music': 'music.html',
};

const serveFile = async (res, route) => {
	const filePath = path.join(__dirname, route);

	try {
		await stat(filePath);

		const data = await readFile(filePath, 'utf8');
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(data);
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.error(`File not found: ${filePath}`);
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('File not found!');
		} else {
			console.error(`Error reading file: ${err.message}`);
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('Internal server error!');
		}
	}
};

const server = createServer(async (req, res) => {
	const route = ROUTES[req.url];

	if (route) {
		await serveFile(res, route);
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Route not found!');
	}
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is listening on http://127.0.0.1:${PORT}`);
});
