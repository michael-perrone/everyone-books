const mongoose = require("mongoose");

const TableBookingSchema = new mongoose.Schema({
  cost: String,
  timeStart: String,
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business'
  },
  date: String,
  employeeBooked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee"
  },
  customerName: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  estDuration: String,
  fakeId: Number,
  numOfPeople: String,
});

const Booking = mongoose.model("tableBooking", TableBookingSchema);

module.exports = Booking;
