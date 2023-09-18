const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "booking"
  },
  newGuest: Boolean,
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  businessesFollowing: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "business"
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "notification"
  },
  bookedNotifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "bookedNotification"
  },
});

module.exports = User = mongoose.model("user", UserSchema);
