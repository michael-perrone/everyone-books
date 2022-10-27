const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  typeOfBusiness: String,
  schedule: [
    Object
  ],
  tables: [
    Object
  ],
  menu: [],
  boxHeight: Number,
  boxWidth: Number,
  phoneNumber: {
    type: String
  },
  bookingColumnType: String,
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
  },
  eq: String,
  c: Number
});
const Business = mongoose.model("business", BusinessSchema);

module.exports = Business;
