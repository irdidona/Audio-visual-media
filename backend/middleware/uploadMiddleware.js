const multer = require('multer');

// Configure multer to store the uploaded file in memory as a buffer
const storage = multer.memoryStorage();

// Set up the upload middleware with file type validation
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000 * 1024 * 1024, // Limit the file size to 1000MB
  },
});

module.exports = upload;
