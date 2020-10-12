const express = require("express");
const router = express.Router();
const Booking = require("../../models/Booking");
const userAuth = require("../../middleware/authUser");
const User = require("../../models/User");
const Business = require("../../models/Business");
const BusinessProfile = require("../../models/BusinessProfile");
const Shift = require("../../models/Shift");
const utils = require('../../utils/utils');
const ServiceType = require("../../models/ServiceType");
const Employee = require("../../models/Employee");
const adminAuth = require('../../middleware/authAdmin');

router.get('/adminSchedule', adminAuth, async (req, res) => {
  let bookings = Booking.find({ businessId: req.admin.businessId, date: req.body.date });
})

router.post("/employee", async (req, res) => {
  let employeeBookings = await Booking.find({ employeeBooked: req.body.employeeId, date: req.body.date });
  if (employeeBookings.length > 0) {
    res.status(200).json({ employeeBookings })
  }
  else {
    res.status(204).send();
  }
})

router.get("/", userAuth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    let bookings = await Booking.find({ _id: user.bookings });
    if (bookings.length) {
      const newBookings = [];
      bookings.forEach(booking => {
        if (new Date(booking.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
          newBookings.push(booking)
        }
      })
      res.status(200).json({ bookings: newBookings });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
  }
});


router.get("/ios", userAuth, async (req, res) => {
  try {
    let bookings = await Booking.find({ customer: req.user.id });
    if (bookings.length) {

      const newBookings = [];
      bookings.forEach(booking => {
        if (new Date(booking.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
          newBookings.push(booking)
        }
      })
      let actualBookings = [];
      if (newBookings.length) {
        for (let t = 0; t < newBookings.length; t++) {
          let serviceNames = [];
          for (let i = 0; i < newBookings[t].serviceType.length; i++) {
            let service = await ServiceType.findOne({ _id: newBookings[t].serviceType[i] });
            serviceNames.push(service.serviceName);
          }
          let cost = newBookings[t].cost;
          let business = await Business.findOne({ _id: newBookings[t].businessId }).select(["businessName"]);
          let time = newBookings[t].time;
          let businessName = business.businessName;
          let employee = await Employee.findOne({ _id: newBookings[t].employeeBooked }).select(["fullName"]);
          let employeeName = employee.fullName;
          let obj = { time: time, cost: cost, serviceNames: serviceNames, business: businessName, employeeName: employeeName, date: newBookings[t].date };
          actualBookings.push(obj)
        }
      }
      console.log(actualBookings)
      res.status(200).json({ bookings: actualBookings });
    } else {
      console.log("hello")
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
  }
});


router.post('/', async (req, res) => {
  try {
    let date1 = utils.getStringDateTime(req.body.timeChosen, req.body.date);
    let dateToUse = new Date(date1.date);
    console.log(dateToUse, "HM", new Date(), new Date() > dateToUse);
    if (new Date() > dateToUse) {
      console.log("OH NO")
      return res.status(409).send();
    }

    let date = new Date(req.body.date).toDateString();
    let services = await ServiceType.find({ _id: req.body.serviceIds });
    let serviceDurationNum = 0;
    let shifts = await Shift.find({ businessId: req.body.businessId, shiftDate: date }).select(["timeStart", "timeEnd", "breakStart", "breakEnd", "employeeName", "employeeId"]);
    for (let l = 0; l < services.length; l++) {
      let timeForEachService = services[l].timeDuration;
      console.log(timeForEachService)
      serviceDurationNum += utils.timeDurationStringToInt[timeForEachService];
    }
    console.log(serviceDurationNum);
    let timeStartNum = utils.stringToIntTime[req.body.timeChosen];
    let viableShifts = [];
    for (let i = 0; i < shifts.length; i++) { // looping throug shifts
      let shiftStartNum = utils.stringToIntTime[shifts[i].timeStart]; // get the startNum
      let shiftEndNum = utils.stringToIntTime[shifts[i].timeEnd]; // get the end num
      if (shiftStartNum <= timeStartNum && (timeStartNum + serviceDurationNum) < shiftEndNum) { // setting it up so the the services and time preferred can be a criteria filtering below
        if (shifts[i].breakStart) { // has to do with breaks we can come back to this
          let breakStartNum = utils.stringToIntTime[shifts[i].breakStart];
          let breakEndNum = utils.stringToIntTime[shifts[i].breakEnd];
          for (let t = 1; t < serviceDurationNum; t++) {
            if ((timeStartNum + t) < breakStartNum) { // making sure that it doesnt run into the break
              viableShifts.push(shift[i]); // adding it into viable shifts
            }
            else if (timeStartNum > breakEndNum) { // making sure it starts after the break
              viableShifts.push(shift[i]);
            }
            else {
              return res.status(406).json({ error: "On break at this time" });
            }
          }
        }
        else {
          viableShifts.push(shifts[i]); // i guess this would be if there is no break
          console.log(viableShifts);
          console.log("viable shifts above")
        }
      }
    }
    let things = []; // empty arrauy
    for (let y = 0; y < viableShifts.length; y++) { // looping through viable shifts
      let employeeArray = []; // we have an empty employee array which i dont quite get
      employeeArray.push(viableShifts[y].employeeId); //
      console.log(employeeArray, "I am employee Array", y)
      console.log(req.body.businessId);
      console.log(viableShifts[y].employeeId);
      console.log(date)
      let bookings = await Booking.find({ employeeBooked: viableShifts[y].employeeId, businessId: req.body.businessId, date: date }).select(["time"]);
      console.log(bookings)
      for (let q = 0; q < bookings.length; q++) {
        let timeSplit = bookings[q].time.split("-");
        let start = timeSplit[0];
        let end = timeSplit[1];
        console.log("DONT MISS ME")
        for (let h = utils.stringToIntTime[start]; h < utils.stringToIntTime[end]; h++) {
          employeeArray.push(h);
          console.log(h, "im h")
        }
      }
      things.push(employeeArray);
      console.log(employeeArray, "im employee array")
    }
    console.log(things, "I AM THINGS")

    let employeesAvailable = [];
    for (b = 0; b < things.length; b++) {
      let testArray = [];
      for (let p = timeStartNum; p < (timeStartNum + serviceDurationNum); p++) {
        if (things[b].includes(p)) {
          testArray.push(p);
        }
      }
      if (testArray.length === 0) {
        employeesAvailable.push(things[b][0]);
        console.log("availble employee", employeesAvailable, things[b][0])
      }
    }
    if (employeesAvailable.length > 0) {
      let employees = await Employee.find({ _id: employeesAvailable }).select(["fullName"])
      console.log(employees)
      return res.status(200).json({ employees })
    } else {
      return res.status(406).send()
    }

  } catch (error) {
    console.log(error)
  }
})


router.post('/individual', async (req, res) => {
  let date = new Date(req.body.date).toDateString();
  console.log(date);
  console.log(req.body.bcn)
  let bookings = await Booking.find({ bcn: req.body.bcn, date: date, businessId: req.body.businessId });
  let timeNumber = utils.stringToIntTime[req.body.time];
  console.log(timeNumber);
  for (let i = 0; i < bookings.length; i++) {
    let timesArray = bookings[i].time.split("-");
    let startNum = utils.stringToIntTime[timesArray[0]];
    let endNum = utils.stringToIntTime[timesArray[1]];
    console.log("what")
    while (startNum <= endNum) {
      if (timeNumber === startNum) {
        console.log("hello")
        console.log(startNum);
        console.log(bookings[i])
        return res.status(200).json({ booking: bookings[i] });
      }
      startNum++;
    }
  }
  return res.status(200).send();
})

module.exports = router;
