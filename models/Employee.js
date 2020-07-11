const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
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
  business: {
    type: String,
    default: 'None'
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "notification"
  }
});

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;
