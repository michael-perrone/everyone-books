const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  price: String,
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
  type: {
    type: String,
  },
  customers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user"
  },
  bcn: String,
  openToPublic: Boolean,
  groupLimitNumber: String

});

const Group = mongoose.model("group", GroupSchema);

module.exports = Group;



