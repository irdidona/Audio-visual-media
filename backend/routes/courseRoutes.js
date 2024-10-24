const express = require("express");
const courseController = require("../controllers/courseController");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

router.post('/add-course',upload.single('imageUrl'), courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.put('/edit-course/:id', courseController.updateCourse);
router.delete('/delete-course/:id', courseController.deleteCourse);

module.exports = router;
