const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();
const chapterController = require('../controllers/chapterController');

// Route to create a chapter with a video upload
router.post('/add-chapter', upload.single('video'), chapterController.createChapter);
router.get('/:courseId', chapterController.getChaptersByCourseId);
router.delete('/:id', chapterController.deleteChapter);
module.exports = router;

