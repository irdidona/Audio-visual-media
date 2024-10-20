const Course = require('../models/course');
const Chapter = require('../models/chapter');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
      const { title, description, teacher } = req.body;
      let imageUrl = null;
  
      // Check if image data is provided
      if (req.body.img) {
        const base64Data = req.body.img.split(';base64,').pop();
        imageUrl = Buffer.from(base64Data, 'base64');
      }
  
      // Create new course with the provided data
      const course = new Course({
        title,
        imageUrl,
        description,
        teacher,
        chapters: [],
      });
  
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get courses', error });
    }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get course', error });
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
   
    try {
        const { id } = req.params; // Course ID from the URL parameter
    const { title, description, teacher } = req.body;
    let updatedFields = { title, description, teacher, updatedAt: Date.now() };

    // Check if a new image is provided
    if (req.body.img) {
      const base64Data = req.body.img.split(';base64,').pop();
      updatedFields.imageUrl = Buffer.from(base64Data, 'base64');
    }

    // Find the course by ID and update it with the new data
    const updatedCourse = await Course.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update course', error });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete course', error });
    }
};
