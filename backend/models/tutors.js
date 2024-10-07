const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  courses: { type: [String], required: true },  // Array of courses
  bio: { type: String, required: true },
  livestreaming: { type: Boolean, default: false }
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
