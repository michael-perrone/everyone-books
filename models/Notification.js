const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  date: String,
  fromId: String,
  fromString: String,
  type: String,
  potentialServices: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "serviceType"
  },
  potentialStartTime: String
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
