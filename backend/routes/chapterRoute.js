const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const chapterController = require('../controllers/chapterController');
const router = express.Router();

// Route to create a chapter with a video upload
router.post('/chapters', upload.single('video'), chapterController.createChapter);

module.exports = router;
