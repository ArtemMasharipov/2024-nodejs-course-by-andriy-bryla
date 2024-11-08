import multer from 'multer';
import path from 'path';
import slugify from 'slugify';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const extension = path.extname(file.originalname);
		const baseName = slugify(path.basename(file.originalname, extension), {
			lower: true,
			strict: true,
		});
		const uniqueName = `${Date.now()}-${baseName}${extension}`;
		cb(null, uniqueName);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Only images are allowed!'), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 2 * 1024 * 1024 }, 
});

export default upload;