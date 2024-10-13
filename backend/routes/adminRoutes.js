const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/add-tutor', adminController.addTutor);

module.exports = router;
