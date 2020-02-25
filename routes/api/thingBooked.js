const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");
const Employee = require('../../models/Employee');
const User = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    let newThingBooked = new Booking({
      serviceType: req.body.booking.bookingType._id,
      cost: req.body.booking.bookingType.cost,
      serviceName: req.body.booking.bookingType.serviceName,
      employeeBooked: req.body.booking.employeeId,
      employeeName: req.body.booking.employeeName,
      bookedBy: req.body.booking.bookedBy,
      businessId: req.body.booking.businessId,
      thingIds: req.body.booking.thingIds,
      timeStart: req.body.booking.timeStart,
      timeEnd: req.body.booking.timeEnd,
      minutes: req.body.booking.minutes,
      date: req.body.booking.date,
      customers: req.body.customers,
      businessName: req.body.booking.businessName
    });
    console.log(newThingBooked)
    if (req.body.customers && req.body.customers.length > 0) {
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
      const bookings = await Booking.find({
        businessId: req.body.booking.businessId,
        date: req.body.date
      });
      console.log(bookings)
      res.status(200).json({ newBooking: newThingBooked, bookings });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/getthings", async (req, res) => {
  try {
    console.log(req.body.businessId);
    console.log(req.body.date)
    const bookings = await Booking.find({
      businessId: req.body.businessId,
      date: req.body.date
    });
    console.log(bookings)
    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    let booking = await Booking.findOne({ _id: req.body.bookingId });
    if (booking) {
      let employee = await Employee.findOne({
        _id: booking.instructorBooked
      });
      if (employee) {
        let newEmployeeBookings = employee.bookings.filter(
          eachBooking => eachBooking._id !== booking.id
        );
        employee.bookings = newEmployeeBookings;
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
    await Booking.findOneAndDelete({ _id: req.body.bookingId });
    let bookings = await Booking.find({
      clubName: req.body.clubName,
      date: req.body.date
    });
    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
