const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');    
const upload = require('../middleware/uploadMiddleware');

router.get('/', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/add-user', upload.single('profilePicture'), userController.createUser);
router.put('/edit-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;