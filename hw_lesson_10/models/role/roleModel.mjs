import mongoose from 'mongoose';

const { Schema } = mongoose;

const roleSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Role name is required'],
		unique: true,
		trim: true,
		lowercase: true,
	},
});

const Role = mongoose.model('Role', roleSchema);
export default Role;
