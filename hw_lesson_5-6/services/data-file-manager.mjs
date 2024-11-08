import fs from 'fs/promises';
import path from 'path';

class DataFileManager {
	constructor(filePath) {
		this.filePath = path.resolve(filePath);
	}

	async saveData(dataArray) {
		try {
			await fs.writeFile(this.filePath, JSON.stringify(dataArray, null, 2), 'utf8');
		} catch (err) {
			this.handleError(`Error saving data: ${err.message}`);
		}
	}

	async loadData() {
		try {
			const data = await fs.readFile(this.filePath, 'utf8');
			return JSON.parse(data);
		} catch (err) {
			if (err.code === 'ENOENT') {
				await this.saveData([]);
				return [];
			}
			this.handleError(`Error loading data: ${err.message}`);
		}
	}

	async addItem(item) {
		const data = await this.loadData();
		data.push(item);
		await this.saveData(data);
	}

	async getItemById(id) {
		const data = await this.loadData();
		const item = data.find(item => item.id === id);
		if (!item) this.handleError(`Item with id ${id} not found`);
		return item;
	}

	async updateItemById(id, updatedProperties) {
		const data = await this.loadData();
		const index = data.findIndex(item => item.id === id);
		if (index === -1) this.handleError(`Item with id ${id} not found`);

		data[index] = { ...data[index], ...updatedProperties };
		await this.saveData(data);
	}

	async deleteItemById(id) {
		const data = await this.loadData();
		const itemIndex = data.findIndex(item => item.id === id);
		if (itemIndex === -1) this.handleError(`Item with id ${id} not found`);

		const item = data[itemIndex];
		await this.handleImageDeletion(item.imgSrc);

		const newData = data.filter(item => item.id !== id);
		await this.saveData(newData);
	}

	async handleImageDeletion(imgSrc) {
		if (imgSrc) {
			try {
				await fs.unlink(path.resolve('uploads', imgSrc));
				console.log(`Image file ${imgSrc} successfully deleted.`);
			} catch (err) {
				this.handleError(`Error deleting image file: ${err.message}`);
			}
		}
	}

	handleError(message) {
		console.error(message);
		throw new Error(message);
	}
}

export default DataFileManager;
