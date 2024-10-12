// routes/userRoutes.js
const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/uploadProfilePicture/:userId', upload.single('profilePicture'), async (req, res) => {
    const userId = req.params.userId;
  
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    try {
      // Update the user's profile picture URL
      const user = await User.findByIdAndUpdate(
        userId,
        { profilePictureUrl: `/uploads/${req.file.filename}` }, // Save relative file path
        { new: true }
      );
  
      res.status(200).json({ message: 'Profile picture uploaded successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading profile picture' });
    }
  });

// Create a new user
router.post('/users', async (req, res) => {
    const { name, email, password, role, bio, profilePicture } = req.body;
  
  // Decode the base64 image data if provided
  let profilePictureBuffer = null;
  if (profilePicture) {
    const base64Data = profilePicture.split(';base64,').pop();
    profilePictureBuffer = Buffer.from(base64Data, 'base64');
  }

  // Create a new user object
  const user = new User({
    name,
    email,
    password,
    role,
    bio,
    profilePicture: profilePictureBuffer
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
    const { name, email, password, role, bio, profilePicture } = req.body;

  try {
    // Prepare the fields to update
    const updatedFields = {
      name,
      email,
      password,
      role,
      bio,
    };

    // Decode the base64 image data if a new profile picture is provided
    if (profilePicture) {
      const base64Data = profilePicture.split(';base64,').pop();
      updatedFields.profilePicture = Buffer.from(base64Data, 'base64');
    }

    // Find the user by ID and update it with the new data
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    // Check if the user was found
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
