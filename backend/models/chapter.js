const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  explanation: { type: String, required: true },
  video: {
    data: Buffer, // To store the video data as a buffer
    contentType: String, // To store the video MIME type (e.g., 'video/mp4')
  },
  quiz: [{ question: String, options: [String], answer: String }],
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
