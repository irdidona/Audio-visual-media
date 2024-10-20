const express = require("express");
const courseController = require("../controllers/courseController");
const router = express.Router();

router.post('/add-course', courseController.createCourse);
router.get('/courses', courseController.getCourses);
router.get('/courses/:id', courseController.getCourseById);
router.put('/edit-course/:id', courseController.updateCourse);
router.delete('/delete-courses/:id', courseController.deleteCourse);

module.exports = router;
