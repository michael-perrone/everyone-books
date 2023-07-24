const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");
const employeeAuth = require("../../middleware/authEmployee");
const authAdmin = require("../../middleware/authAdmin");
const Business = require('../../models/Business');

router.get("/employee", employeeAuth, async (req, res) => {
  const employeesBookings = await Booking.find({
    employeeBooked: req.employee.id,
    date: req.body.date
  });

  res.status(200).json({ employeesBookings });
});

router.post("/schedule", async (req, res) => {
  // month day year
  const bookings = await Booking.find({
    employeeBooked: req.body.employeeId,
    date: req.body.date
  });
  res.status(200).json({ bookings });
});


router.post('/', authAdmin, async (req, res) => {
  console.log(req.body);
  const bookings = await Booking.find({businessId: req.admin.businessId, date: req.body.date, employeeBooked: req.body.employee});
  const business = await Business.find({_id: req.admin.businessId})
  if (bookings.length === 0 && business.eq === "n") {
    res.status(200).json({success:true})
  }
  
})

module.exports = router;
