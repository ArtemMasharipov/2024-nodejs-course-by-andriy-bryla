// ========================================== Задача 3 ==========================================
/*Розробити програму з такими функціональними можливостями:

Обробка статичних маршрутів:
-----------------------------------------
"/"      	 Вітання користувача
"/goals" 	 Ваші цілі
-----------------------------------------

Обробка статичних файлів:
---------------------------------------------------------
about     Містить тему та умову задачі
news      Містить перелік важливих новин (для Вас)
---------------------------------------------------------

Обробка параметрів запитів:
------------------------------------------------------------------------------
/info/:myLinks    У залежності від значення параметра повертає сторінку з:
						«sites» - адресами улюблених сайтів
						«films» - адреси улюблених онлайн кінотеатрів
						«me» - або інформацію про себе
------------------------------------------------------------------------------
*/
// ===============================================================================================
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/routes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3088;

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));