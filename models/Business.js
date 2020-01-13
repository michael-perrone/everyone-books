const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  typeOfBusiness: String,
  schedule: [
      Object
  ],
  phoneNumber: {
    type: String
  },
  bookingColumnType: String,

  businessNameAllLower: {
    type: String
  },
  businessName: {
  type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  bookingColumnNumber: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  events: {
    type: String
  },
  promos: {
      type: [String]
  },
  bio: {
    type: String
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user"
  },
  businessProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clubProfile"
  }
});
const Business = mongoose.model("business", BusinessSchema);

module.exports = Business;
