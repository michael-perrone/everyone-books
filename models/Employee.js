const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  profession: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  businessAccepted: {
    type: Boolean,
    default: false
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courtBooked"
    }
  ],
  businessWorkingAt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business"
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "notification"
  }
});

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;
