import connectDB from '../db/connectDB.mjs';
import RolesDBService from '../models/role/RolesDBService.mjs';

export const setupDatabase = async () => {
	try {
		await connectDB();
		await RolesDBService.initializeDefaultRolesAndAdmin();
		console.log('Database initialized successfully');
	} catch (error) {
		console.error('Database initialization failed:', error);
		process.exit(1);
	}
};
