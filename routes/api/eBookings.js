const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");
const employeeAuth = require("../../middleware/authEmployee");

router.get("/employee", employeeAuth, async (req, res) => {
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
