const mongoose = require("mongoose");

const EmPayrollSchema = new mongoose.Schema({
  employee: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "employee"
  },
  employeeName: String,
  paidHourly: Boolean,
  paidSalary: Boolean,
  productCommission: Boolean,
  serviceCommission: Boolean,
  pcp: String,
  scp: String,
  salary: String,
  hourly: String,  // check this should change all this to numbers
  groupPercent: Number,
});

const EmPayroll = mongoose.model("emPayroll", EmPayrollSchema);

module.exports = EmPayroll;