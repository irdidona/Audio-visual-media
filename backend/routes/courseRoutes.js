const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getCourses, getCourseById, createCourse, updateCourse } = require('../controllers/courseController');
const router = express.Router();

router.route('/').get(getCourses).post(protect, createCourse);
router.route('/:id').get(getCourseById).put(protect, updateCourse);

module.exports = router;
