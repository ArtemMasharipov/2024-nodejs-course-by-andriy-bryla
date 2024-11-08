//========================================== Задача 1 ========================================== 
// У консольний додаток передають через параметр пенсійний вік.Наприклад
// node app.mjs –-pension=65
// Потім питаємо у терміналі користувача скільки йому років(використати “readline”) 
// і кажемо чи він є пенсіонером.
// =============================================================================================

import readline from 'node:readline';

const args = new URLSearchParams(process.argv.slice(2).join('&'));
const pensionAge = parseInt(args.get('--pension'), 10);

if (isNaN(pensionAge) || pensionAge <= 0) {
	console.error(`Error: Please provide a valid pension age (--pension=<age>)`);
	process.exit(1);
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

askAge();

function askAge() {
	rl.question('How old are you? ', (age) => {
		const userAge = parseInt(age, 10);
		if (isNaN(userAge) || userAge <= 0) {
			console.error('Please provide a valid positive age.');
			askAge();
		} else {
			console.log(userAge >= pensionAge ? `You are a pensioner.` : `You are not a pensioner.`);
			rl.close();
		}
	});
}
