const operations = {
	add: (numbers) => numbers.reduce((acc, curr) => acc + curr, 0),
	subtract: (numbers) => numbers.reduce((acc, curr) => acc - curr),
	mult: (numbers) => numbers.reduce((acc, curr) => acc * curr, 1),
};

export const performOperation = (operation, numbersArray) => {
	const operationFunc = operations[operation];
	if (!operationFunc) {
		throw new Error('Invalid operation! Use add, subtract, or mult.');
	}
	return operationFunc(numbersArray);
};