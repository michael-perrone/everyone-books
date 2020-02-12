const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");
const instructorAuth = require("../../middleware/authInstructor");

router.post("/", async (req, res) => {
  let allBookings = await Booking.find({
    instructorBooked: req.body.instructorId
  });

  let bookingsToSendBack = [];

  for (let i = 0; i < allBookings.length; i++) {
    if (allBookings[i].players.length > 0) {
      let playersGrabbed = allBookings[i].players;
      for (let x = 0; x < playersGrabbed.length; x++) {
        if (req.body.userId == playersGrabbed[x]) {
          bookingsToSendBack.push(allBookings[i]);
        }
      }
    }
  }
  if (bookingsToSendBack.length > 0) {
    res.status(200).json({ bookings: bookingsToSendBack });
  } else {
    res.status(204).send();
  }
});

router.get("/employee", instructorAuth, async (req, res) => {
  let employeesBookings = await Booking.find({
    employeeBooked: req.employee.id,
    date: req.body.date
  });

  res.status(200).json({ employeesBookings });
});

router.post("/schedule", async (req, res) => {
  // month day year

  

  let bookings = await Booking.find({
    employeeBooked: req.body.employeeId,
    date: req.body.date
  });

  res.status(200).json({ bookings });
});

module.exports = router;
