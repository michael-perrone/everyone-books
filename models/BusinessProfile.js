const mongoose = require("mongoose");
const businessProfileSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business"
  },
    employeesToSendInvite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee"
    }
  ],
  employeesWhoAccepted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee"
    }
  ],
  services: [],
  events: [],
  bio: String,
  otherServices: []
});

const BusinessProfile = mongoose.model("businessProfile", businessProfileSchema);

module.exports = BusinessProfile;