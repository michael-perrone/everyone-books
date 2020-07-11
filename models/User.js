const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "booking"
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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
