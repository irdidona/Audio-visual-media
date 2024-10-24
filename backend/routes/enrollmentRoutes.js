const express = require('express');
const router = express.Router();

const enrollmentController = require('../controllers/enrollmentController'); // Ensure this path is correct
const authenticateToken = require('../middleware/authMiddleware'); // Ensure this middleware is correctly imported

router.post('/enroll', enrollmentController.createEnrollment); // Use the function directly

module.exports = router;
