const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notificationType: String,
  date: String,
  notificationRead: {
    type: Boolean,
    default: false
  },
  fromId: String,
  fromString: String,
  type: String,
  answer: Boolean
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
