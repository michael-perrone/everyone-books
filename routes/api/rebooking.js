const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");

router.post("/", async (req, res) => {
  let booking = await Booking.findOne({ _id: req.body.bookingId });
  booking.bookedBy = req.body.rebookName;
  await booking.save();
  if (booking) {
    res.status(200).send();
  }
});

module.exports = router;
