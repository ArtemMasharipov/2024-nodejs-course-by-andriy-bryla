// ========================================== Задача 1 ==========================================
// Розробити додаток з такими маршрутами:
// --------------------------------------------------
// Маршрут   	Що повертає
// --------------------------------------------------
// season    повертає пору року
// day       повертає поточний день
// time      повертає час дня (ранок, обід, вечеря)
// --------------------------------------------------
// =============================================================================================== 
import express from 'express';
import {
	getCurrentSeason,
	getCurrentDay,
	getTimeOfDay
} from './time_handlers.mjs';

const app = express();
const PORT = 3004;

app.get('/season', (req, res) => {
	res.send(`Current season is: ${getCurrentSeason()}`);
});

app.get('/day', (req, res) => {
	res.send(`Today is: ${getCurrentDay()}`);
});

app.get('/time', (req, res) => {
	res.send(`It is currently: ${getTimeOfDay()}`);
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
