const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/add-tutor', adminController.addTutor);
router.get('/tutors', adminController.getTutors);
router.get('/tutors/:id', adminController.getTutorById);
router.put('/edit-tutor/:id', adminController.updateTutor);
router.delete('/delete-tutor/:id', adminController.deleteTutor);

module.exports = router;
