const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");

router.post("/", async (req, res) => {
  try {
    const employeeFound = await Employee.findById({
      _id: req.body.employeeId
    }).select(['id', 'bookings', 'fullName']);

    employeeFound.bookings = [
      req.body.newBooking,
      ...employeeFound.bookings
    ];

    await employeeFound.save();
    res.status(200).json({ employeeFound });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
