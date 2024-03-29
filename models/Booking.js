const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  cost: String,
  time: String,
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business'
  },
  date: String,
  employeeBooked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee"
  },
  serviceType: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'serviceType'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  bcn: String,
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product"
  }
});

const Booking = mongoose.model("booking", BookingSchema);

module.exports = Booking;
