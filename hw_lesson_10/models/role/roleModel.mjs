import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Role schema
const roleSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Role name is required'],
		unique: true,
		trim: true,
		lowercase: true,
	},
});

// Create and export the Role model
const Role = mongoose.model('Role', roleSchema);
export default Role;
