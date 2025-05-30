const multer = require('multer');

// Store files in memory buffer (required for storing in MongoDB)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
