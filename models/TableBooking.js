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
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  tableId: String,
  numOfPeople: String
});

const Booking = mongoose.model("tableBooking", TableBookingSchema);

module.exports = Booking;
