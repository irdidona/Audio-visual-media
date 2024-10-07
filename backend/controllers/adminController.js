const Tutor = require('../models/tutors');

exports.addTutor = async (req, res) => {
    const { name, surname, email, courses, bio, livestreaming } = req.body;
  
    try {
      const newTutor = new Tutor({
        name,
        surname,
        email,
        courses,
        bio,
        livestreaming
      });
      await newTutor.save();
      res.status(201).json({ message: 'Tutor added successfully', newTutor });
    } catch (error) {
      res.status(500).json({ message: 'Error adding tutor', error });
    }
  };