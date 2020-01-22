const express = require("express");
const router = express.Router();
const instructorAuth = require("../../middleware/authInstructor");
const Instructor = require("../../models/Instructor");
const Booking = require("../../models/Booking");
const userAuth = require("../../middleware/authUser");
const User = require("../../models/User");

router.get("/", userAuth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    let bookings = await Booking.find({ _id: user.bookings });
    if (bookings.length) {
      res.status(200).json({ bookings: bookings });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
