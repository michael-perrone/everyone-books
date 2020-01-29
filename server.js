const express = require("express");
const app = express();
const cors = require("cors");
const connectedDatabase = require("./config/db");
const path = require("path");

app.use(cors());
connectedDatabase();

app.use(express.json({ extended: false }));

app.use('/api/business', require('./routes/api/business'));
app.use("/api/getInstructor", require("./routes/api/getInstructor"));
app.use("/api/getBookings", require("./routes/api/getBookings"));
app.use("/api/notifications", require("./routes/api/notifications"));
app.use("/api/thingBooked", require("./routes/api/thingBooked"));
app.use("/api/club", require("./routes/api/club"));
app.use("/api/usersSignup", require("./routes/api/usersSignup"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/employeeSignup", require("./routes/api/employeeSignup"));
app.use("/api/instructorProfile", require("./routes/api/instructorProfile"));
app.use("/api/userProfile", require("./routes/api/userProfile"));
app.use("/api/adminSignup", require("./routes/api/adminSignup"));
app.use("/api/businessList", require("./routes/api/businessList"));
app.use("/api/businessProfile", require("./routes/api/businessProfile"));
app.use("/api/employeeList", require("./routes/api/employeeList"));
app.use('/api/getEmployees', require('./routes/api/getEmployees'));

app.use(
  "/api/checkInstructorAvailability",
  require("./routes/api/checkInstructorAvailability")
);
app.use("/api/clubProfileEvents", require("./routes/api/clubProfileEvents"));
app.use(
  "/api/instructorCourtsBooked",
  require("./routes/api/instructorCourtsBooked")
);

app.use("/api/userSubscribe", require("./routes/api/userSubscribe"));

app.use("/api/userClubs", require("./routes/api/userClubs"));
app.use("/api/getCustomers", require("./routes/api/getCustomers"));
app.use("/api/getPlayers", require("./routes/api/getPlayers"));
app.use("/api/rebooking", require("./routes/api/rebooking.js"));
app.use("/api/rebooked", require("./routes/api/rebooked"));
app.use("/api/iBookings", require("./routes/api/iBookings"));
app.use("/api/addImage", require("./routes/api/addImage"));
app.use('/api/getEmployee', require('./routes/api/getEmployee'));
app.use('/api/employeeNotificationsRead', require('./routes/api/employeeNotificationsRead'))

app.use(express.static("./client/build"));
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
// dwdwd
// dwdw
// dwdwddd
//ssss
app.listen(PORT, "0.0.0.0", () => {
  console.log("we here");
});
