import mongoose from 'mongoose';
import config from '../../config/default.mjs';

const { Schema } = mongoose;

const ownerSchema = new Schema({
	fullName: {
		type: String,
		required: [true, 'Full name is required'],
		minlength: [2, 'Full name must be at least 2 characters long'],
		maxlength: [100, 'Full name must be at most 100 characters long'],
		trim: true,
	},
	address: {
		type: String,
		required: [true, 'Address is required'],
		minlength: [5, 'Address must be at least 5 characters long'],
		maxlength: [200, 'Address must be at most 200 characters long'],
		trim: true,
	}
});

ownerSchema.statics.checkDatabaseExists = async function () {
	try {
		const databases = await mongoose.connection.db.listDatabases();
		return databases.databases.some(db => db.name === config.databaseName);
	} catch (error) {
		console.error('Error checking database existence:', error);
		return false;
	}
};

ownerSchema.statics.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: 'owners' }).toArray();
		return collections.length > 0;
	}
	return false;
};

const Owner = mongoose.model('Owner', ownerSchema);

export default Owner;
