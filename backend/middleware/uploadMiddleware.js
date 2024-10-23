const multer = require('multer');

// Configure multer to store the uploaded file in memory as a buffer
const storage = multer.memoryStorage();

// Set up the upload middleware 
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
});

module.exports = upload;
