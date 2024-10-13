const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const courseController = require("../controllers/courseController");
const router = express.Router();

// router.route("/").get(protect, getCourses).post(protect, createCourse);
// router.route("/:id").get(getCourseById).put(protect, updateCourse);

router.post('/add-course', courseController.createCourse);
router.get('/courses', courseController.getCourses);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;
