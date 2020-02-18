const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  serviceName: String,
  cost: Number,
  timeStart: String,
  timeEnd: String,
  bookedBy: String,
  thingIds: [String],
  serviceName: String,
  minutes: String,
  businessName: String,
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business'
  },
  date: String,
  employeeName: {
    type: String,
    default: "None"
  },
  employeeBooked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instructor"
  },
  serviceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'serviceType'
  },
  customers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user"
  }
});

const Booking = mongoose.model("booking", BookingSchema);

module.exports = Booking;
