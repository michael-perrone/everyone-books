const express = require("express");
const app = express();
const cors = require("cors");
const connectedDatabase = require("./config/db");
const path = require("path");


app.use(cors());
connectedDatabase();

app.use(express.json({ extended: false }));
app.use('/api/encyclopedia', require("./routes/api/encyclopedia"));
app.use('/api/ads', require("./routes/api/ads"));
app.use("/api/restaurant", require("./routes/api/restaurant"));
//app.use("/api/payroll", require("./routes/api/payroll"));
app.use("/api/connect", require("./routes/api/connect"));
app.use('/api/groups', require("./routes/api/groups"));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/adminSchedule', require('./routes/api/adminSchedule'));
app.use('/api/employees_dates', require('./routes/api/employees_dates'));
app.use('/api/services', require('./routes/api/services'));
app.use('/api/business', require('./routes/api/business'));
app.use("/api/getBookings", require("./routes/api/getBookings"));
app.use("/api/notifications", require("./routes/api/notifications"));
app.use("/api/thingBooked", require("./routes/api/thingBooked"));
app.use("/api/usersSignup", require("./routes/api/usersSignup"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/employeeSignup", require("./routes/api/employeeSignup"));
app.use("/api/userProfile", require("./routes/api/userProfile"));
app.use("/api/adminSignup", require("./routes/api/adminSignup"));
app.use("/api/businessList", require("./routes/api/businessList"));
app.use("/api/businessProfile", require("./routes/api/businessProfile"));
app.use("/api/employeeList", require("./routes/api/employeeList"));
app.use('/api/getEmployees', require('./routes/api/getEmployees'));
app.use('/api/shifts', require('./routes/api/shifts'));
app.use('/api/getServiceTypes', require('./routes/api/getServiceTypes'))
app.use(
  "/api/checkEmployeeAvailability",
  require("./routes/api/checkEmployeeAvailability")
);
app.use("/api/clubProfileEvents", require("./routes/api/clubProfileEvents"));
app.use(
  "/api/employeeBookings",
  require("./routes/api/employeeBookings")
);
app.use("/api/userSubscribe", require("./routes/api/userSubscribe"));
app.use("/api/userBusinesses", require("./routes/api/userBusinesses"));
app.use("/api/getCustomers", require("./routes/api/getCustomers"));
app.use("/api/getPlayers", require("./routes/api/getPlayers"));
app.use("/api/rebooking", require("./routes/api/rebooking.js"));
app.use("/api/rebooked", require("./routes/api/rebooked"));
app.use("/api/eBookings", require("./routes/api/eBookings"));
app.use("/api/addImage", require("./routes/api/addImage"));
app.use('/api/getEmployee', require('./routes/api/getEmployee'));
app.use('/api/employeeNotificationsRead', require('./routes/api/employeeNotificationsRead'))
app.use('/api/iosBooking', require("./routes/api/iosBooking"))
app.use('/api/changePassword', require("./routes/api/changePassword"));
app.use('/api/employeeInfo', require('./routes/api/employeeInfo'))
app.use(express.static("./client/build"));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("LISTENING ON PORT " + PORT);
});


