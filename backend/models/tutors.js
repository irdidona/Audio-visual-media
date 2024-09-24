const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  liveStreaming: { type: Boolean, default: false },
});

module.exports = mongoose.model('Tutor', TutorSchema);
