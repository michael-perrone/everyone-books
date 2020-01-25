const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "courtBooked"
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: {
    type: String
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
