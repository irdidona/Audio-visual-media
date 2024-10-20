const User = require('../models/user');
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }       
}

exports.updateUser = async (req, res) => {
    const { name, email,password, role, bio, profilePicture } = req.body;
  
    try {
      const updatedFields = {
        name,
        email,
        password,
        role,
        bio,
      };
  
      if (profilePicture) {
        const base64Data = profilePicture.split(';base64,').pop();
        updatedFields.profilePicture = Buffer.from(base64Data, 'base64');
      }
  
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.createUser = async (req, res) => {
    const { name, email, password, role, bio } = req.body;
    let profilePicture = null;

    try {
        // Check if a file is uploaded
        if (req.file) {
            profilePicture = req.file.buffer; // Get the file's buffer (binary data)
        }

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user with the provided data
        const user = await User.create({
            name,
            email,
            password,
            role,
            bio,
            profilePicture,
        });

        // Respond with the user data if successfully created
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                bio: user.bio,
                profilePicture: user.profilePicture ? user.profilePicture.toString('base64') : null,
                token: generateToken(user._id),

            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {   
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }   
}