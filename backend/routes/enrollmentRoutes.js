const express = require('express');
const router = express.Router();

const enrollmentController = require('../controllers/enrollmentController');

router.post('/add-enrollment', enrollmentController.createEnrollment);

module.exports = router;