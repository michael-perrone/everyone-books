const mongoose = require("mongoose");

const CourtBookedSchema = new mongoose.Schema({
  timeStart: String,
  timeEnd: String,
  bookedBy: String,
  thingIds: [String],
  minutes: String,
  businessName: String,
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business'
  },
  date: String,
  instructorName: {
    type: String,
    default: "None"
  },
  instructorBooked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instructor"
  },
  bookingType: {
    required: true,
    type: String
  },
  customers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user"
  }
});

const CourtBooked = mongoose.model("courtBooked", CourtBookedSchema);

module.exports = CourtBooked;
