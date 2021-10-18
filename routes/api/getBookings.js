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

router.post("/moreBookingInfo", async (req, res) => {
  console.log(req.body.serviceIds);
  const serviceTypes = await ServiceType.find({ _id: req.body.serviceIds });
  console.log(serviceTypes)
  const customer = await User.findOne({ _id: req.body.customerId }).select(["phoneNumber", "fullName"]);
  const employee = await Employee.findOne({ _id: req.body.employeeId }).select(["fullName"]);
  res.status(200).json({ services: serviceTypes, customer: customer, employeeName: employee.fullName });
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

router.post("/removeService", async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.body.bookingId });
    console.log(req.body.serviceId);
    const servicesForBooking = [...booking.serviceType];
    const newServices = servicesForBooking.filter(id => id.toString() !== req.body.serviceId.toString());
    booking.serviceType = newServices;
    //
    let timeNum = 0;
    let services = await ServiceType.find({ _id: newServices });
    console.log(services);
    let costNum = 0;
    for (let i = 0; i < services.length; i++) {
      timeNum += utils.timeDurationStringToInt[services[i].timeDuration];
      costNum += services[i].cost;
    }
    let bookingTimeArray = booking.time.split("-");
    console.log(bookingTimeArray);
    const endTime = utils.intToStringTime[utils.stringToIntTime[bookingTimeArray[0]] + timeNum];
    console.log(endTime);
    booking.time = bookingTimeArray[0] + `-${endTime}`;
    booking.cost = `$${costNum}`;
    await booking.save();
    res.status(200).json({ cost: `$${costNum}`, time: bookingTimeArray[0] + `-${endTime}` });
  }
  catch (error) {
    console.log(error)
  }
})


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
      res.status(200).json({ bookings: [] })
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/smallTimes", async (req, res) => {
  try {
    let services = await ServiceType.find({ _id: req.body.services });
    console.log(services);
    let timeDurationNum = 0;
    let numOfFiveMinServices = 0;
    let numOfTenMinServices = 0;
    let numOfTwentyMinuteServices = 0;
    let addedMinutes = 0;
    for (let i = 0; i < services.length; i++) {
      if (services[i].timeDuration !== "10 Minutes" && services[i].timeDuration !== "5 Minutes" && services[i].timeDuration !== "20 Minutes") {
        timeDurationNum += utils.timeDurationStringToInt[services[i].timeDuration];
      }
      else {
        if (services[i].timeDuration === "5 Minutes") {
          numOfFiveMinServices += 1;
          addedMinutes += 5;
        }
        else if (services[i].timeDuration === "10 Minutes") {
          numOfTenMinServices += 1;
          addedMinutes += 10;
        }
        else if (services[i].timeDuration === "20 Minutes") {
          numOfTwentyMinuteServices += 1;
          addedMinutes += 20;
        }
      }
    }
    if (numOfTenMinServices === 0 && numOfTenMinServices === 0) {
      timeDurationNum = timeDurationNum;
    } else {
      timeDurationNum = timeDurationNum + Math.ceil(addedMinutes / 15);
    }


    console.log(timeDurationNum);
    if (timeDurationNum) {
      res.status(200).json({ timeDurationNum })
    }
  }
  catch (error) {
    console.log(error);
  }
})


router.post('/', async (req, res) => {
  try {
    console.log(req.body.timeChosen);
    let date1 = utils.getStringDateTime(req.body.timeChosen, req.body.date);
    console.log(req.body)
    let dateToUse = new Date(date1.date);
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
      serviceDurationNum += utils.timeDurationStringToInt[timeForEachService];
    }
    if (req.body.timeDurationNum) {
      serviceDurationNum = req.body.timeDurationNum;
    }
    let business = await Business.findOne({ _id: req.body.businessId }).select(["eq"]);
    if (business.eq === "n") {
      let bp = await BusinessProfile.findOne({ business: business._id });
      let employees = await Employee.find({ _id: bp.employeesWhoAccepted }).select(["fullName"]);
      res.status(200).json({ employees, eq: business.eq })
    }
    else {
      let timeStartNum = utils.stringToIntTime[req.body.timeChosen];
      let viableShifts = [];
      for (let i = 0; i < shifts.length; i++) { // looping throug shifts
        let shiftStartNum = utils.stringToIntTime[shifts[i].timeStart]; // get the startNum
        let shiftEndNum = utils.stringToIntTime[shifts[i].timeEnd]; // get the end num
        if (shiftStartNum <= timeStartNum && (timeStartNum + serviceDurationNum) <=
          shiftEndNum) {
          // setting it up so the the services and time preferred can be a criteria filtering below
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
          }
        }
      }
      let things = []; // empty arrauy
      for (let y = 0; y < viableShifts.length; y++) { // looping through viable shifts
        let employeeArray = []; // we have an empty employee array which i dont quite get
        employeeArray.push(viableShifts[y].employeeId); //
        let bookings = await Booking.find({ employeeBooked: viableShifts[y].employeeId, businessId: req.body.businessId, date: date }).select(["time"]);
        for (let q = 0; q < bookings.length; q++) {
          let timeSplit = bookings[q].time.split("-");
          let start = timeSplit[0];
          let end = timeSplit[1];
          for (let h = utils.stringToIntTime[start]; h < utils.stringToIntTime[end]; h++) {
            employeeArray.push(h);
          }
        }
        things.push(employeeArray);
        console.log(employeeArray, "im employee array")
      }

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
        }
      }
      if (employeesAvailable.length > 0) {
        console.log(employeesAvailable, "employees available here")
        let employees = await Employee.find({ _id: employeesAvailable }).select(["fullName"])
        return res.status(200).json({ employees })
      } else {
        console.log("do i print????")
        return res.status(406).send()
      }
    }
  } catch (error) {
    console.log(error)
  }
})

router.post("/editBooking", async (req, res) => {
  try {
    console.log("hi")
    let booking = await Booking.findOne({ _id: req.body.bookingId });
    let bookingTimeArray = booking.time.split("-");
    let business = await Business.findOne({ _id: booking.businessId }).select(["eq"]);
    const previousServiceTypes = [...booking.serviceType];
    const newServiceTypes = [...previousServiceTypes, ...req.body.servicesToAdd];
    let newServices = await ServiceType.find({ _id: newServiceTypes });
    booking.serviceType = newServiceTypes;
    if (business.eq === "n") {
      let bp = await BusinessProfile.findOne({ business: business._id });
      let employees = await Employee.find({ _id: bp.employeesWhoAccepted }).select(["fullName"]);

      res.status(200).json({ employees, eq: business.eq })
    }
    else {
      let bookings = await Booking.find({ date: booking.date });
      let counterNum = 0;
      console.log(counterNum);
      for (let i = 0; i < newServices.length; i++) {
        console.log(counterNum);
        counterNum += utils.timeDurationStringToInt[newServices[i].timeDuration];
      }
      console.log("hello")
      let bookingsWithCurrentRemoved = bookings.filter((element, index) => {
        return element._id.toString() !== booking._id.toString();
      });
      const indexStart = utils.stringToIntTime[bookingTimeArray[0]];
      console.log(counterNum, "counterNum");
      for (let index = indexStart; index < indexStart + counterNum; index++) {
        console.log(index, "index")
        for (let i = 0; i < bookingsWithCurrentRemoved.length; i++) {
          console.log(i, "i")
          let timeArray = bookingsWithCurrentRemoved[i].time.split("-");
          console.log(index, "index")
          console.log(timeArray)
          if (utils.intToStringTime[index] === utils.intToStringTime[utils.stringToIntTime[timeArray[0]]]) {
            console.log(bookingTimeArray)
            console.log("big error mate", utils.intToStringTime[index], utils.intToStringTime[utils.stringToIntTime[timeArray[0]] + 1], index)
            return res.status(400).send();
          }
        }
      }
      console.log("got through");
    }


    //////////////////////////////////////////////////////////////////



    let timeNum = 0;

    let costNum = 0;
    for (let i = 0; i < newServices.length; i++) {
      timeNum += utils.timeDurationStringToInt[newServices[i].timeDuration];
      costNum += newServices[i].cost;
    }
    const endTime = utils.intToStringTime[utils.stringToIntTime[bookingTimeArray[0]] + timeNum];
    booking.time = bookingTimeArray[0] + `-${endTime}`;
    booking.cost = `$${costNum}`;
    await booking.save();
    res.status(200).json({ cost: `$${costNum}`, time: bookingTimeArray[0] + `-${endTime}` });
  }
  catch (error) {
    console.log(error)
  }

})


router.post('/individual', async (req, res) => {
  let date = new Date(req.body.date).toDateString();
  console.log(req.body);
  let bookings = await Booking.find({ bcn: req.body.bcn, date: date, businessId: req.body.businessId });
  let timeNumber = utils.stringToIntTime[req.body.time];
  if (timeNumber === undefined) {
    let fifteenMinuteTimeArray = req.body.time.split("-");
    timeNumber = utils.stringToIntTime[fifteenMinuteTimeArray[0]];
    console.log(timeNumber);
    console.log(utils.intToStringTime[timeNumber]);
  }
  console.log(timeNumber);
  for (let i = 0; i < bookings.length; i++) {
    let timesArray = bookings[i].time.split("-");
    let startNum = utils.stringToIntTime[timesArray[0]];
    let endNum = utils.stringToIntTime[timesArray[1]];
    console.log("what")
    while (startNum <= endNum) {
      if (timeNumber === startNum) {
        return res.status(200).json({ booking: bookings[i] });
      }
      startNum++;
    }
  }
  return res.status(200).send();
})

module.exports = router;
