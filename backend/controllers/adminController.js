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

  exports.getTutors = async (req, res) => {
    try {
      const tutors = await Tutor.find();
      res.status(200).json(tutors);
    } catch (error) {
      res.status(500).json({ message: 'Error getting tutors' });
    }
  }

  exports.getTutorById = async (req, res) => {
    try {
      const tutor = await Tutor.findById(req.params.id);
      res.status(200).json(tutor);
    } catch (error) {
      res.status(500).json({ message: 'Error getting tutor' });
    }
  }

  exports.updateTutor = async (req, res) => {
    const { name, surname, email, courses, bio, livestreaming } = req.body;
  
    try {
      const tutor = await Tutor.findByIdAndUpdate(
        req.params.id,
        { name, surname, email, courses, bio, livestreaming },
        { new: true }
      );
      res.status(200).json({ message: 'Tutor updated successfully', tutor });
    } catch (error) {
      res.status(500).json({ message: 'Error updating tutor' });
    }
  }

  exports.deleteTutor = async (req, res) => {
    try {
      await Tutor.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Tutor deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting tutor' });
    }
  }
