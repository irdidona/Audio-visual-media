// enrollmentController.js
const Enrollment = require('../models/enrollment');

exports.createEnrollment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        const newEnrollment = new Enrollment({
            courseId,
            userId,
            enrolledAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
        await newEnrollment.save();
        res.status(201).json(newEnrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
