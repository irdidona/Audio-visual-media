const Chapter = require('../models/chapter');

// Create a new chapter
exports.createChapter = async (req, res) => {
  try {
    const { title, description, explanation } = req.body;

    // Create a new Chapter object
    const chapter = new Chapter({
      title,
      description,
      explanation,
      // If a video is uploaded, save the video data
      video: req.file
        ? {
            data: req.file.buffer, // The uploaded video buffer
            contentType: req.file.mimetype, // The video MIME type
          }
        : null,
    });

    // Save the chapter to the database
    await chapter.save();
    res.status(201).json({ message: 'Chapter created successfully', chapter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
