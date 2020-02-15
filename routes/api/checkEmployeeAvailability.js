const express = require("express");
const Instructor = require("../../models/Instructor");
const Booking = require("../../models/Booking");
const router = express.Router();

router.post("/", async (req, res) => {
  let employeeBookings = await Booking.find({
    employeeBooked: req.body.employeeId,
    date: req.body.date
  });

  for (let i = 0; i < employeeBookings.length; i++) {
    let length = employeeBookings[i].thingIds.length;
    let thingIds = employeeBookings[i].thingIds;
    for (let e = 0; e < length; e++) {
      let thingIds1Array = thingIds[e].split("");
      thingIds1Array.shift();
      let realThingIds1 = thingIds1Array.join("");
      for (let m = 0; m < req.body.thingIds.length; m++) {
        if (realThingIds1 === req.body.thingIds[m]) {
          return res.status(200).json({ bookingNotOkay: true });
        }
      }
    }
  }
  return res.status(200).json({ bookingNotOkay: false });
});

module.exports = router;
