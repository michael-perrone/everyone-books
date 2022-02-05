const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  date: String,
  fromId: String,
  fromString: String,
  type: String
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
