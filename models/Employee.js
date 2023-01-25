const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  idsSent: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
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
  },
  bookedNotifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "bookedNotifcation"
  },
  secondBusiness: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business"
  },
  jt: String,
  pw: String,
  ph: String,
  cw: String,
  ur: String
});

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;
