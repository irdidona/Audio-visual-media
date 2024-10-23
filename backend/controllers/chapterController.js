const { videoUpload } = require('../middleware/uploadMiddleware');
const Chapter = require('../models/chapter');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dzn9y8w4b',
  api_key: '417982832797984',
  api_secret: 'G5WkzNHZ8MtLhJ_6hQ4REyT5vys',
});

// Create a new chapter
exports.createChapter = async (req, res) => {
  console.log('Incoming request to create a chapter'); // Log the request start

  try {
    const { title, description, explanation, courseId} = req.body;

    // Create a new Chapter object
    const chapter = new Chapter({
      title,
      description,
      explanation,
      // If a video is uploaded, save the video data
      videoUrl: req.file
        ? {
            data: req.file.buffer, // The uploaded video buffer
            contentType: req.file.mimetype, // The video MIME type
          }
        : null,
       courseId
    });

    // Save the chapter to the database
    await chapter.save();
    res.status(201).json({ message: 'Chapter created successfully', chapter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
