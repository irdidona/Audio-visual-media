const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chapters: [
    {
      videoUrl: String,
      description: String,
      explanation: String,
      quiz: [
        {
          question: String,
          answers: [String],
          correctAnswer: String,
        }
      ],
    }
  ],
});

CourseSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Course', CourseSchema);
