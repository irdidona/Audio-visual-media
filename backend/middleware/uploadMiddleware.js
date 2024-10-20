const multer = require('multer');

// Configure multer to store the uploaded file in memory as a buffer
const storage = multer.memoryStorage();

// Set up the upload middleware with file type validation
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept only images and videos
    if (file.mimetype.startsWith('video') || file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // Limit the file size to 50MB
  },
});

module.exports = upload;
