const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "booking"
  },
  newGuest: Boolean,
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  businessesFollowing: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "business"
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "notification"
  }
});

module.exports = User = mongoose.model("user", UserSchema);
