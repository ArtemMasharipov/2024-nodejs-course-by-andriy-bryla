import multer from 'multer';

// Настройка multer для хранения в памяти
const storage = multer.memoryStorage();

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Ограничение на размер файла (5 MB)
}).single('image');

export default upload;
