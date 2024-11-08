import { processNumbers, saveNumberToFile, removeNumbersFile } from './fileUtils.mjs';

export const handleSaveNum = (pathname, res) => {
	const number = parseFloat(pathname.split('/')[2]);

	if (!isNaN(number)) {
		saveNumberToFile(number);
		return res.writeHead(200).end(`Number ${number} saved!`);
	}
	return res.writeHead(400).end('Invalid number!');
};

export const handleRemoveFile = (res) => {
	if (removeNumbersFile()) {
		return res.writeHead(200).end('Numbers file removed!');
	}
	return res.writeHead(404).end('Numbers file does not exist!');
};

export const handleSum = (res) => {
	processNumbers(res, (numbers, res) => {
		const sum = numbers.reduce((acc, curr) => acc + curr, 0);
		return res.writeHead(200).end(`Sum of numbers: ${sum}`);
	});
};

export const handleMult = (res) => {
	processNumbers(res, (numbers, res) => {
		const product = numbers.reduce((acc, curr) => {
			return curr !== 0 ? acc * curr : acc;
		}, 1);
		return res.writeHead(200).end(`Product of numbers (excluding zeros): ${product}`);
	});
};
