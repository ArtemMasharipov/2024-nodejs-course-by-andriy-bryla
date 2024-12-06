class MongooseCRUDManager {
	constructor(model) {
		this.model = model;
	}

	// Get a list of documents with filters, projections, and optional population
	async getList(filters = {}, projection = null, populateFields = []) {
		try {
			let query = this.model.find(filters, projection);
			populateFields.forEach((field) => {
				if (typeof field === 'string') {
					query = query.populate(field);
				} else if (field.fieldForPopulation && field.requiredFieldsFromTargetObject) {
					query = query.populate(
						field.fieldForPopulation,
						field.requiredFieldsFromTargetObject
					);
				}
			});
			return await query.exec();
		} catch (error) {
			throw new Error(`Error retrieving data: ${error.message}`);
		}
	}

	// Create a new document
	async create(data) {
		try {
			const newItem = new this.model(data);
			return await newItem.save();
		} catch (error) {
			throw new Error(`Error creating data: ${error.message}`);
		}
	}

	// Get a document by ID with optional population
	async getById(id, populateFields = []) {
		try {
			let query = this.model.findById(id);
			populateFields.forEach((field) => {
				query = query.populate(field);
			});
			return await query.exec();
		} catch (error) {
			throw new Error(`Error finding data by ID: ${error.message}`);
		}
	}

	// Update a document by ID
	async update(id, data) {
		try {
			return await this.model
				.findByIdAndUpdate(id, data, { new: true, runValidators: true })
				.exec();
		} catch (error) {
			throw new Error(`Error updating data: ${error.message}`);
		}
	}

	// Delete a document by ID
	async deleteById(id) {
		try {
			return await this.model.findByIdAndDelete(id).exec();
		} catch (error) {
			throw new Error(`Error deleting data: ${error.message}`);
		}
	}
}

export default MongooseCRUDManager;
