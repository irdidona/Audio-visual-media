const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { 
    data: Buffer, // To store the img data as a buffer
    contentType: String, }, // To store the img MIME type (e.g., 'image/png')
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },

});

CourseSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Course', CourseSchema);
