import mongoose from 'mongoose';
import config from '../../config/default.mjs';

const { Schema } = mongoose;

const carSchema = new Schema({
	brand: {
		type: String,
		required: [true, 'Car brand is required'],
		minlength: [2, 'Brand must be at least 2 characters long'],
		maxlength: [50, 'Brand must be at most 50 characters long'],
		trim: true,
	},
	year: {
		type: Number,
		required: [true, 'Year is required'],
		min: [1886, 'Year must be after 1885'],
		max: [new Date().getFullYear(), 'Year cannot be in the future'],
	},
	plateNumber: {
		type: String,
		required: [true, 'Plate number is required'],
		unique: true,
		trim: true,
	},
	imgBase64: {
		type: String,
		default: null,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Owner', 
		required: true,
	},
});

carSchema.statics.checkDatabaseExists = async function () {
	try {
		const databases = await mongoose.connection.db.listDatabases();
		return databases.databases.some(db => db.name === config.databaseName);
	} catch (error) {
		console.error('Error checking database existence:', error);
		return false;
	}
};

carSchema.statics.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: 'cars' }).toArray();
		return collections.length > 0;
	}
	return false;
};

const Car = mongoose.model('Car', carSchema);

export default Car;