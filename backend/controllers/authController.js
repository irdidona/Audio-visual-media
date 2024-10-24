const { profile } = require("console");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
 
  return jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.register = async (req, res) => {
  const { name, email, password, role,bio, profilePictureUrl } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    profilePictureUrl,
    bio,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePictureUrl: user.profilePictureUrl,
      bio: user.bio,
      token: generateToken(user._id, user.email),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePictureUrl: user.profilePictureUrl,
        bio: user.bio,
        token: generateToken(user._id, user.email),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
