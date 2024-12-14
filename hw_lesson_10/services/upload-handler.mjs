import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
		}
	},
}).single('image');

export default upload;