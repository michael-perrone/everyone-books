const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business"
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "notification"
  }
});
const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
