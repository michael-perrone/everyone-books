const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");
const Instructor = require("../../models/Instructor");
const User = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    let newThingBooked = new Booking({
      bookingType: req.body.booking.bookingType,
      employeeBooked: req.body.booking.employeeId,
      employeeName: req.body.booking.employeeName,
      bookedBy: req.body.booking.bookedBy,
      businessName: req.body.booking.clubName,
      thingIds: req.body.booking.thingIds,
      timeStart: req.body.booking.timeStart,
      timeEnd: req.body.booking.timeEnd,
      minutes: req.body.booking.minutes,
      date: req.body.booking.date,
      customers: req.body.customers
    });
    if (req.body.customers.length > 0) {
      const customers = await User.find({ _id: newCourtBooked.players });
      for (let i = 0; i < customers.length; i++) {
        let previousCustomersBookings = [...customers[i].bookings];
        previousCustomersBookings.push(newCourtBooked._id);
        customers[i].bookings = previousCustomersBookings;
        customers[i].save();
      }
    }
    await newThingBooked.save();

    if (newThingBooked) {
      const bookings = await Bookings.find({
        businessId: req.body.booking.businessId,
        date: req.body.date
      });
      res.status(200).json({ newBooking: newCourtBooked, bookings });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/getthings", async (req, res) => {
  try {
    const bookings = await Booking.find({
      businessId: req.body.businessId,
      date: req.body.date
    });
    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    let booking = await CourtBooked.findOne({ _id: req.body.bookingId });
    if (booking) {
      let instructor = await Instructor.findOne({
        _id: CourtBooked.instructorBooked
      });
      if (instructor) {
        let newInstructorBookings = instructor.bookings.filter(
          eachBooking => eachBooking._id !== booking.id
        );
        instructor.bookings = newInstructorBookings;
        instructor.save();
      }
      let players = await User.find({ _id: booking.players });
      if (players.length) {
        for (let i = 0; i < players.length; i++) {
          let newPlayerBookings = players[i].bookings.filter(
            eachBooking => eachBooking._id !== booking.id
          );
          players[i].bookings = newPlayerBookings;
          players[i].save();
        }
      }
    }
    await CourtBooked.findOneAndDelete({ _id: req.body.bookingId });
    let bookings = await CourtBooked.find({
      clubName: req.body.clubName,
      date: req.body.date
    });
    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
