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
  serviceTypes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'serviceType'
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'product'
  }
});

const BusinessProfile = mongoose.model("businessProfile", businessProfileSchema);

module.exports = BusinessProfile;
