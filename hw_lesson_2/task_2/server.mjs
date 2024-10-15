//========================================== Задача 3 ==========================================
// Користувач через роут ‘/save_num/число’ може передати на сервер якесь число.Ці числа поступово 
// треба зберігати у текстовому файлі numbers.txt.Наприклад, використовуючи такий роут:
// http://localhost:3000/save_num/78  -  у файл треба додати число 78.
// А використовуючи роути  ‘/sum’ – знайти суму, ‘mult’ –знайти добуток. 
// За роутом «/remove» файл треба видалити.
//============================================================================================== 
import { createServer } from 'node:http';
import url from 'node:url';
import {
	handleSaveNum,
	handleRemoveFile,
	handleSum,
	handleMult
} from './routes.mjs';

const server = createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const { pathname } = parsedUrl;

	switch (pathname) {
		case pathname.startsWith('/save_num/') && pathname:
			return handleSaveNum(pathname, res);

		case '/remove':
			return handleRemoveFile(res);

		case '/sum':
			return handleSum(res);

		case '/mult':
			return handleMult(res);

		case '/':
			return res.writeHead(200).end('Welcome! Use /save_num/number, /sum, /mult, or /remove.');

		default:
			return res.writeHead(404).end('Route not found!');
	}
});

server.listen(3004, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3003');
});
