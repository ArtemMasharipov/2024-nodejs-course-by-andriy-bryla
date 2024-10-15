//========================================== Задача 3 ==========================================
// Через параметри запиту передають операцію(add, subtract, mult) і числа(розділені дефісами),
// які треба опрацювати.Знайти результат і повернути користувачу.Наприклад при запиті:
// http://localhost:3000/add/12-4-23-45   - треба знайти суму чисел 12,4,23,45
//============================================================================================== 
import { createServer } from 'node:http';
import { handleMathOperation } from './handlers.mjs';

const PORT = 3000;
const HOST = '127.0.0.1';

const server = createServer((req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const [, operation, numbers] = url.pathname.split('/');

	if (operation && numbers) {
		return handleMathOperation(operation, numbers, res);
	}

	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('Route not found! Use /add, /subtract, or mult with numbers.');
});

server.listen(PORT, HOST, () => {
	console.log(`Server is listening on ${HOST}:${PORT}`);
});