import fs from 'fs';

const numbersFilePath = 'numbers.txt';

export const processNumbers = (res, callback) => {
	const numbers = readNumbersFromFile();
	if (numbers.length === 0) {
		return res.writeHead(404).end('Numbers file does not exist or is empty!');
	}
	return callback(numbers, res);
};
export const readNumbersFromFile = () => {
	if (fs.existsSync(numbersFilePath)) {
		return fs.readFileSync(numbersFilePath, 'utf-8')
			.split('\n')
			.map(Number)
			.filter(num => !isNaN(num));
	}
	return [];
};

export const saveNumberToFile = (number) => {
	fs.appendFileSync(numbersFilePath, `${number}\n`);
};

export const removeNumbersFile = () => {
	if (fs.existsSync(numbersFilePath)) {
		fs.unlinkSync(numbersFilePath);
		return true;
	}
	return false;
};
