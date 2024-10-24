const enrollment = require('../models/enrollmentModel');

exports.createEnrollment = async (req, res) => {
    try {
        const { courseId, userId } = req.body;
        const newEnrollment = new enrollment({
        courseId,
        userId,
        enrolledAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        });
        await newEnrollment.save();
        res.status(201).json(newEnrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };