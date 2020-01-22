const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");

router.post("/", async (req, res) => {
  let booking = await Booking.findOne({ _id: req.body.bookingId });
  if (booking.bookedBy !== req.body.currentlyBookedBy) {
    res.status(200).json({ rebooked: true, bookedBy: booking.bookedBy });
  }
});

module.exports = router;
