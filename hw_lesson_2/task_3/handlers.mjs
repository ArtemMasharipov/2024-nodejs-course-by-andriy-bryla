import { performOperation } from './mathOperations.mjs';

export const handleMathOperation = (operation, numbers, res) => {
	try {
		const numbersArray = validateNumbers(numbers);
		const result = performOperation(operation, numbersArray);
		sendResponse(res, 200, `Result of ${operation}: ${result}`);
	} catch (error) {
		sendResponse(res, 400, `Error: ${error.message}`);
	}
};

const validateNumbers = (numbers) => {
	const numbersArray = numbers.split('-').map(Number);
	if (numbersArray.some(Number.isNaN)) {
		throw new Error('Invalid numbers in the request!');
	}
	return numbersArray;
};

const sendResponse = (res, statusCode, message) => {
	res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
	res.end(message);
};