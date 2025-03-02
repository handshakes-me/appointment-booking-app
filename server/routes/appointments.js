
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new appointment
router.post('/', async (req, res) => {
  const appointment = new Appointment({
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
  });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;




const { body, validationResult } = require('express-validator');

// POST a new appointment with validation
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('date').isISO8601().toDate().withMessage('Valid date is required'),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const appointment = new Appointment({
      name: req.body.name,
      email: req.body.email,
      date: req.body.date,
    });

    try {
      const newAppointment = await appointment.save();
      res.status(201).json(newAppointment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);
