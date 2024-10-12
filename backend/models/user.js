const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student', 'tutor'], required: true },
  profilePicture: { type: Buffer }, // Storing image as a Buffer
  bio: String,
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

// module.exports = mongoose.model('User', UserSchema);


// models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     role: { type: String, enum: ['admin', 'tutor', 'student'], default: 'student' },
//     active: { type: Boolean, default: true },
//     createdAt: { type: Date, default: Date.now }
// });

module.exports = mongoose.model('User', UserSchema);
