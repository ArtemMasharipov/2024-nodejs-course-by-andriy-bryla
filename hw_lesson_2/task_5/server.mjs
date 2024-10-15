//========================================== Задача 5 ==========================================
// Задача 5. Створити додаток з історією.У файлі json зберігаємо усі роути та кількість 
// відвідувань.У налаштуваннях settings.json зберігати який роут треба використати для перегляду 
// історії та назву файлу де зберігається історіяimport { createServer } from 'node:http';
// =============================================================================================

import fs from 'node:fs/promises';
import settings from './settings.json' assert { type: 'json' };

const historyFilePath = settings.historyFile;

const getHistoryData = async () => {
	try {
		const data = await fs.readFile(historyFilePath, 'utf-8');
		return JSON.parse(data);
	} catch (err) {
		return err.code === 'ENOENT' ? {} : Promise.reject(err);
	}
};

const updateHistoryData = async (url) => {
	const history = await getHistoryData();
	history[url] = (history[url] || 0) + 1;
	await fs.writeFile(historyFilePath, JSON.stringify(history, null, 2));
};

const sendResponse = (res, statusCode, contentType, message) => {
	res.writeHead(statusCode, { 'Content-Type': contentType });
	res.end(message);
};

const server = createServer(async (req, res) => {
	try {
		if (req.url === settings.historyRoute) {
			const history = await getHistoryData();
			sendResponse(res, 200, 'application/json', JSON.stringify(history));
		} else {
			await updateHistoryData(req.url);
			sendResponse(res, 200, 'text/plain', 'History updated!');
		}
	} catch (err) {
		sendResponse(res, 500, 'text/plain', 'Internal server error!\n');
	}
});

const PORT = 3000;
server.listen(PORT, '127.0.0.1', () => {
	console.log(`Listening on http://127.0.0.1:${PORT}`);
});