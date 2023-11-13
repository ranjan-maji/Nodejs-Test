
const express = require('express');
const router = express.Router();
const db = require('../db');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const { validateVehicle, validateBooking, validateBookingResponse, validateUser } = require('../validations/vehicleValidation');


//vehicles
router.post('/vehicles', (req, res) => {
  const { error } = validateVehicle(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { type, name } = req.body;
  const stmt = db.prepare('INSERT INTO vehicles (type, name) VALUES (?, ?)');
  stmt.run(type, name);
  stmt.finalize();

  res.send('Vehicle added successfully');
});

router.get('/vehicles', (req, res) => {
  db.all('SELECT * FROM vehicles', (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.json(rows);
  });
});

//booking
router.post('/bookings', (req, res) => {
  const { error } = validateBooking(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { vehicleType, startTime, endTime } = req.body;

  // Check if there is already a booking for the same vehicle type within the specified time range
  db.get(
    'SELECT * FROM bookings WHERE vehicleType = ? AND ((startTime >= ? AND startTime <= ?) OR (endTime >= ? AND endTime <= ?))',
    [vehicleType, startTime, endTime, startTime, endTime],
    (err, existingBooking) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      if (existingBooking) {
        return res.status(400).send('Booking for the same vehicle type overlaps with an existing booking');
      }

      // If no overlapping booking, proceed to create a new booking
      const stmt = db.prepare('INSERT INTO bookings (vehicleType, startTime, endTime) VALUES (?, ?, ?)');
      stmt.run(vehicleType, startTime, endTime);
      stmt.finalize();

      res.send('Booking submitted successfully');
    }
  );
});

router.get('/bookings', (req, res) => {
    db.all('SELECT * FROM bookings', (err, bookings) => {
      if (err) {
        return res.status(500).send(err.message);
      }
  
      // Validate the response format
      const { error } = validateBookingResponse(bookings);
      if (error) {
        return res.status(500).send(error.details[0].message);
      }
  
      res.json(bookings);
    });
  });;


///User
  router.post('/users', (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const { firstName, lastName, numberOfWheels, vehicleType, vehicleModel } = req.body;
  
    const stmt = db.prepare(
      'INSERT INTO users (firstName, lastName, numberOfWheels, vehicleType, vehicleModel) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(firstName, lastName, numberOfWheels, vehicleType, vehicleModel);
    stmt.finalize();
  
    res.send('User details submitted successfully');
  });
  
 
  router.get('/users', (req, res) => {
    db.all('SELECT * FROM users', (err, users) => {
      if (err) {
        return res.status(500).send(err.message);
      }
  
      // Validate the response format
      const { error } = validateUser(users);
      if (error) {
        return res.status(500).send(error.details[0].message);
      }
  
      res.json(users);
    });
  });

module.exports = router;
