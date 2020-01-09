const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  phoneNumber: {
    type: String
  },
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
  numberBookingColumns: {
    type: String,
    required: true
  },
  openTime: {
    type: String,
    required: true
  },
  closeTime: {
    type: String,
    required: true
  },
  website: {
    type: String
  },

  events: {
    type: String
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
