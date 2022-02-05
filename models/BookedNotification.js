const mongoose = require("mongoose");

const bookedNotificationSchema = new mongoose.Schema({
  date: String,
  fromId: String,
  fromString: String,
  type: String,
  ps: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "serviceType"
  },
  potentialStartTime: String,
  potentialDate: String,
  potentialEmployee: String
});

const Notification = mongoose.model("bookedNotification", bookedNotificationSchema);

module.exports = Notification;
