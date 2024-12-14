// ==============================================================================================
//  Урок №10.  Автентифікація. Password
// ========================================== Задача ============================================
// Задача. У будь - якому з ваших проєктів:
// 1)Структрувати проєкт(винести окремі секції app.mjs у окремі розділи і модулі за зразком на лекції)
// 2)додати автентифікацію з використанням модуля  Password
// ==============================================================================================
import express from 'express';
import { setupMiddleware } from './setup/middleware.mjs';
import { setupRoutes } from './setup/routes.mjs';
import { setupDatabase } from './setup/database.mjs';
import { setupErrorHandling } from './setup/error-handling.mjs';
import { setupViews } from './setup/views.mjs';

const app = express();

// Setup middleware
setupMiddleware(app);

// Setup views
setupViews(app);

// Setup database connection
setupDatabase();

// Setup routes
setupRoutes(app);

// Setup error handling
setupErrorHandling(app);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
