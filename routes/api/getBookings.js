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
const Product = require('../../models/Product');
const Admin = require("../../models/Admin");
const BookedNotification = require("../../models/BookedNotification");
const Group = require("../../models/Group");
const employeeAuth = require("../../middleware/authEmployee");

router.get('/adminSchedule', adminAuth, async (req, res) => {
  let bookings = Booking.find({ businessId: req.admin.businessId, date: req.body.date });
})

router.post("/moreBookingInfo", adminAuth, async (req, res) => {
  const booking = await Booking.findOne({_id: req.body.bookingId});
  const serviceTypes = await ServiceType.find({ _id: booking.serviceType });
  const customer = await User.findOne({ _id: booking.customer }).select(["phoneNumber", "fullName"]);
  const employee = await Employee.findOne({ _id: booking.employeeBooked }).select(["fullName"]);
  let products = [];
  for (let i = 0; i < booking.products.length; i++) {
    let prod = await Product.findOne({_id: booking.products[i]});
    products.push(prod);
  }
  if (employee) {
    res.status(200).json({ services: serviceTypes, customer: customer, employeeName: employee.fullName, products});
  }
  else {
    res.status(200).json({ services: serviceTypes, customer: customer, employeeName: "None", products});
  }
})

router.post("/moreBookingInfoEmployee", employeeAuth, async (req, res) => {
  console.log(req.employee);
  const booking = await Booking.findOne({_id: req.body.bookingId});
  const serviceTypes = await ServiceType.find({ _id: booking.serviceType });
  const customer = await User.findOne({ _id: booking.customer }).select(["phoneNumber", "fullName"]);
  const employee = await Employee.findOne({ _id: booking.employeeBooked }).select(["fullName"]);
  let products = [];
  for (let i = 0; i < booking.products.length; i++) {
    let prod = await Product.findOne({_id: booking.products[i]});
    products.push(prod);
  }
  if (employee) {
    res.status(200).json({ services: serviceTypes, customer: customer, employeeName: employee.fullName, products});
  }
  else {
    res.status(200).json({ services: serviceTypes, customer: customer, employeeName: "None", products});
  }
})

router.post("/moreGroupInfo", async (req, res) => {
  const group = await Group.findOne({_id: req.body.groupId});
  const customers = await User.find({ _id: group.customers }).select(["phoneNumber", "fullName"]);
  const employee = await Employee.findOne({ _id: group.employeeBooked }).select(["fullName"]);
  res.status(200).json({ customers: customers, employeeName: employee ? employee.fullName : "None"}); 
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

router.get("/userHistory", userAuth, async (req, res) => {
  try {
    let bookings = await Booking.find({ customer: req.user.id });
    if (bookings.length) {
      const pastBookings = [];
      bookings.forEach(booking => {
        let startTime = booking.time.split("-")[0];
        let date = utils.getStringDateTime(startTime, booking.date);
        if (date.date <= new Date()) {
          pastBookings.push(booking)
        }
      })
      let actualBookings = [];
      if (pastBookings.length) {
        for (let t = 0; t < pastBookings.length; t++) {
          let serviceNames = [];
          for (let i = 0; i < pastBookings[t].serviceType.length; i++) {
            let service = await ServiceType.findOne({ _id: pastBookings[t].serviceType[i] });
            serviceNames.push(service.serviceName);
          } 
          let cost = pastBookings[t].cost;
          let business = await Business.findOne({ _id: pastBookings[t].businessId }).select(["businessName"]);
          let time = pastBookings[t].time;
          let businessName = business.businessName;
          let employee = await Employee.findOne({ _id: pastBookings[t].employeeBooked }).select(["fullName"]);
          let employeeName = employee.fullName;
          let obj = { time: time, cost: cost, serviceNames: serviceNames, business: businessName, employeeName: employeeName, date: pastBookings[t].date };
          actualBookings.push(obj);
        }
        actualBookings.sort((a,b) => {
          return new Date(a.date) - new Date(b.date)
       })
      }
      console.log(actualBookings)
      res.status(200).json({ bookings: actualBookings });
    } else {
      res.status(200).json({ bookings: [] })
    }
  } catch (error) {
    console.log(error);
  }
  // const bookings = await Booking.find({customer: req.user.id});
  // const pastBookings = [];
  // for (let i = 0; i < bookings.length; i++) {
  //   let startTime = bookings[i].time.split("-")[0];
  //   let date = utils.getStringDateTime(startTime, bookings[i].date);
  //   if (date.date < new Date()) {
  //     pastBookings.push(bookings[i]);
  //   }
  // }
  // res.status(200).json({pastBookings});
})

router.get("/", userAuth, async (req, res) => {
  console.log(req.user.id);
  try {
    console.log("anything at all")
    let user = await User.findOne({ _id: req.user.id });
    console.log(req.user.id);
    let bookings = await Booking.find({ customer: req.user.id });
    console.log(bookings);
    if (bookings.length) {
      const newBookings = [];
      console.log("ANYTHING")
      bookings.forEach(booking => {
        if (new Date(booking.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
          newBookings.push(booking)
        }
      })
      newBookings.sort(e => new Date(e.date) > new Date(e.date));
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
    let groups = await Group.find({customers: req.user.id});
    let bookings = await Booking.find({ customer: req.user.id });
    if (bookings.length && groups.length) {
      const newBookings = [];
      bookings.forEach(booking => {
        if (new Date(booking.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
          newBookings.push(booking)
        }
      })
      const newGroups = [];
      groups.forEach(group => {
        if (new Date(group.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
          newGroups.push(group);
        }
      })
      let actualGroups = [];
      let actualBookings = [];
      if (newGroups.length) {
        for (let t = 0; t < newGroups.length; t++) {
          let customers = [];
          console.log(newGroups[t])
          newGroups[t].customers.forEach(async customer => {
            let realCustomer = await User.findOne({_id: customer}).select(['fullName']);
            customers.push(realCustomer.fullName);
          })
          let name = newGroups[t].type;
          let price = newGroups[t].price;
          let business = await Business.findOne({ _id: newGroups[t].businessId }).select(["businessName"]);
          let time = newGroups[t].time;
          let businessName = business.businessName;
          let employee = await Employee.findOne({ _id: newGroups[t].employeeBooked }).select(["fullName"]);
          let employeeName;
          if (employee) {
            employeeName = employee.fullName;
          }
          let _id = newGroups[t]._id;
          let obj = { _id, time: time, price: price, customerNames: customers, businessName: businessName, employeeName: employeeName, date: newGroups[t].date, name};
          console.log(obj);
          actualGroups.push(obj);
        }
      }
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
          let employeeName;
          if (employee) {
            employeeName = employee.fullName;
          }
          let _id = newBookings[t]._id;
          let obj = { _id, time: time, cost: cost, serviceNames: serviceNames, business: businessName, employeeName: employeeName, date: newBookings[t].date };
          actualBookings.push(obj);
          actualBookings.sort((a,b) => {
             return new Date(a.date) - new Date(b.date)
          })
          console.log(actualBookings)
        }
      }
      res.status(200).json({ bookings: actualBookings, groups: actualGroups });
    } else if (groups.length && !bookings.length) {
      const newGroups = [];
      groups.forEach(group => {
        if (new Date(group.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
          newGroups.push(group);
        }
      })
      let actualGroups = [];
      if (newGroups.length) {
        for (let t = 0; t < newGroups.length; t++) {
          let customers = [];
          console.log(newGroups[t])
          newGroups[t].customers.forEach(async customer => {
            let realCustomer = await User.findOne({_id: customer}).select(['fullName']);
            customers.push(realCustomer.fullName);
          })
          let name = newGroups[t].type;
          let price = newGroups[t].price;
          let business = await Business.findOne({ _id: newGroups[t].businessId }).select(["businessName"]);
          let time = newGroups[t].time;
          let businessName = business.businessName;
          let employee = await Employee.findOne({ _id: newGroups[t].employeeBooked }).select(["fullName"]);
          let employeeName;
          if (employee) {
            employeeName = employee.fullName;
          }
          let _id = newGroups[t]._id;
          let obj = { _id, time: time, customerNames: customers, price: price, businessName: businessName, employeeName: employeeName, date: newGroups[t].date, name };
          console.log(obj)
          actualGroups.push(obj);
          actualGroups.sort((a,b) => {
             return new Date(a.date) - new Date(b.date)
          })
        }
      }
      res.status(200).json({groups: actualGroups, bookings: []})
    }
    else if (!groups.length && bookings.length) {
      const actualBookings = [];
      const newBookings = [];
      bookings.forEach(booking => {
        if (new Date(booking.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
          newBookings.push(booking)
        }
      })
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
        let employeeName;
        if (employee) {
          employeeName = employee.fullName;
        }
        let _id = newBookings[t]._id;
        let obj = { _id, time: time, cost: cost, serviceNames: serviceNames, business: businessName, employeeName: employeeName, date: newBookings[t].date };
        actualBookings.push(obj);
        actualBookings.sort((a,b) => {
           return new Date(a.date) - new Date(b.date)
        })
        console.log(actualBookings)
      }
    res.status(200).json({ bookings: actualBookings, groups: [] });
    }
    else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
  }
});


router.post('/', adminAuth, async (req, res) => {
  try {

    let date1 = utils.getStringDateTime(req.body.timeChosen, req.body.date);
    let dateToUse = new Date(date1.date);
    if (new Date() > dateToUse) {
      return res.status(409).send();
    }
    if (req.body.fromUser) {
      const admin = await Admin.findOne({ business: req.body.businessId });
      const prevNotis = await BookedNotification.find({_id: admin.bookedNotifications});
      const user = await User.findOne({_id: req.body.userId});
      console.log(user)
      for (let i = 0; i < prevNotis.length; i++) {
          if (prevNotis[i].potentialDate === date1.dateString && prevNotis[i].fromId.toString() === user._id.toString()) {
              return res.status(403).send();
          }
       }
    }

    let services = await ServiceType.find({ _id: req.body.serviceIds });
    let serviceDurationNum = 0;
    let shifts = await Shift.find({ businessId: req.body.businessId, shiftDate: date1.dateString }).select(["timeStart", "timeEnd", "breakStart", "breakEnd", "employeeName", "employeeId"]);
    for (let l = 0; l < services.length; l++) {
      let timeForEachService = services[l].timeDuration;
      serviceDurationNum += utils.timeDurationStringToInt[timeForEachService];
    }
    // if (req.body.timeDurationNum) {
    //   serviceDurationNum = req.body.timeDurationNum;
    // }
    const business = await Business.findOne({ _id: req.body.businessId }).select(["eq", "bookingColumnNumber", "schedule"]);
    const businessProfile = await BusinessProfile.findOne({business: business._id});
    if (business.eq === "n") {
      let services = await ServiceType.find({_id: req.body.serviceIds});
        let timeNum = 0;
        for (let i = 0; i < services.length; i++) {
            timeNum += utils.timeDurationStringToInt[services[i].timeDuration];
        }
        const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeChosen] + timeNum];
        const startTimeNum = utils.stringToIntTime[req.body.timeChosen];
        const endTimeNum = utils.stringToIntTime[endTime];

        function cte(num) {
          if (endTimeNum <=  utils.stringToIntTime[business.schedule[num].close]) {
            return true;
          }
          else {
            return false;
          }
        }

          const day = date1.dateString.split(" ")[0];
          if (day === "Sun") {
            if (!cte(0)) {
             return res.status(201).json({day: "Sunday"})
            }
          }
          if (day === "Mon") {
            if (!cte(1)) {
             return res.status(201).json({day: "Monday"})
            }
          }
          if (day === "Tue") {
           if (!cte(2)) {
            return res.status(201).json({day: "Tuesday"})
           }
         }
         if (day === "Wed") {
           if (!cte(3)) {
            return res.status(201).json({day: "Wednesday"})
           }
         }
         if (day === "Thu") {
           if (!cte(4)) {
            return res.status(201).json({day: "Thursday"})
           }
         }
         if (day === "Fri") {
           if (!cte(5)) {
            return res.status(201).json({day: "Friday"})
           }
         }
         if (day === "Sat") {
           if (!cte(6)) {
            return res.status(201).json({day: "Saturday"})
            }
          }

        let whiley = startTimeNum;
        let timeNums = [];
        while(whiley < endTimeNum) {
            timeNums.push(whiley);
            whiley++;
        }

        let bookings = await Booking.find({date: date1.dateString, businessId: req.body.businessId});
        let groups = await Group.find({date: date1.dateString, businessId: req.body.businessId});
        let allBookings = [...groups, ...bookings];
        const takenColumns = [];
        const employeesWhoCant = [];
        for (let i = 0; i < allBookings.length; i++) {
            let startTime = allBookings[i].time.split("-")[0];
            let endTime = allBookings[i].time.split("-")[1];
            let startTimeNum = utils.stringToIntTime[startTime];
            let endTimeNum = utils.stringToIntTime[endTime];
            const nums = [];
            let whiley = startTimeNum;
            while(whiley < endTimeNum) {
                nums.push(whiley);
                whiley++;
            }
            if (timeNums.some(iNum => nums.includes(iNum))) {
                takenColumns.push(Number(allBookings[i].bcn));
                if (allBookings[i].employeeBooked) {
                  employeesWhoCant.push(allBookings[i].employeeBooked.toString());
                }
            }
        }
        let bcn = Number(business.bookingColumnNumber);
      
        for (let t = 0; t < employeesWhoCant.length; t++) {
          let index = businessProfile.employeesWhoAccepted.findIndex(ewa => ewa.toString() === employeesWhoCant[t].toString());
          if (index > -1) {
            businessProfile.employeesWhoAccepted.splice(index, 1);
          }
      }
        let i = 1;
        let bcnArray = [];
        while (i <= bcn) {
            bcnArray.push(i);
            i++;
        }
        for (let i = 0; i <= takenColumns.length; i++) {
            if (bcnArray.includes(takenColumns[i])) {
                bcnArray.splice(takenColumns[i] - 1, 1);
            }
        }
       const employees = await Employee.find({_id: businessProfile.employeesWhoAccepted}).select(["fullName", "_id"]);
       console.log(employees)
       console.log(businessProfile)
       if (employees.length > 0) {
        return res.status(200).json({employees, bcnArray, date: date1.dateString})
       }
       else {
         console.log("huh?")
         return res.status(406).send();
       }
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
                viableShifts.push(shifts[i]); // adding it into viable shifts
              }
              else if (timeStartNum >= breakEndNum) { // making sure it starts after the break
                viableShifts.push(shifts[i]);
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
        const bookings = await Booking.find({ employeeBooked: viableShifts[y].employeeId, businessId: req.body.businessId, date: date1.dateString }).select(["time"]);
        const groups = await Group.find({employeeBooked: viableShifts[y].employeeId, businessId: req.body.businessId, date: date1.dateString }).select(["time"]);
        const allBookings = [...groups, ...bookings];
        for (let q = 0; q < allBookings.length; q++) {
          let timeSplit = allBookings[q].time.split("-");
          let start = timeSplit[0];
          let end = timeSplit[1];
          for (let h = utils.stringToIntTime[start]; h < utils.stringToIntTime[end]; h++) {
            employeeArray.push(h);
          }
        }
        things.push(employeeArray);
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
        let employees = await Employee.find({ _id: employeesAvailable }).select(["fullName"])
        return res.status(200).json({ employees, date: date1.dateString });
      } else {
        console.log("do i print????")
        return res.status(406).send()
      }
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/userChecking', userAuth, async (req, res) => {
  try {

    let date1 = utils.getStringDateTime(req.body.timeChosen, req.body.date);
    let dateToUse = new Date(date1.date);
    if (new Date() > dateToUse) {
      console.log("OH NO")
      return res.status(409).send();
    }
    // if (req.body.fromUser) {
    //   const admin = await Admin.findOne({ business: req.body.businessId });
    //   const prevNotis = await BookedNotification.find({_id: admin.bookedNotifications});
    //   const user = await User.findOne({_id: req.body.userId});
    //   console.log(user)
    //   for (let i = 0; i < prevNotis.length; i++) {
    //       if (prevNotis[i].potentialDate === date1.dateString && prevNotis[i].fromId.toString() === user._id.toString()) {
    //           return res.status(403).send();
    //       }
    //    }
    // }

    let services = await ServiceType.find({ _id: req.body.serviceIds });
    let serviceDurationNum = 0;
    let shifts = await Shift.find({ businessId: req.body.businessId, shiftDate: date1.dateString }).select(["timeStart", "timeEnd", "breakStart", "breakEnd", "employeeName", "employeeId"]);
    for (let l = 0; l < services.length; l++) {
      let timeForEachService = services[l].timeDuration;
      serviceDurationNum += utils.timeDurationStringToInt[timeForEachService];
    }
    // if (req.body.timeDurationNum) {
    //   serviceDurationNum = req.body.timeDurationNum;
    // }
    const business = await Business.findOne({ _id: req.body.businessId }).select(["eq", "bookingColumnNumber", "schedule"]);
    const businessProfile = await BusinessProfile.findOne({business: business._id});
    if (business.eq === "n") {
      let services = await ServiceType.find({_id: req.body.serviceIds});
        let timeNum = 0;
        for (let i = 0; i < services.length; i++) {
            timeNum += utils.timeDurationStringToInt[services[i].timeDuration];
        }
        const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeChosen] + timeNum];
        const startTimeNum = utils.stringToIntTime[req.body.timeChosen];
        const endTimeNum = utils.stringToIntTime[endTime];

        function cte(num) {
          if (endTimeNum <=  utils.stringToIntTime[business.schedule[num].close]) {
            return true;
          }
          else {
            return false;
          }
        }

          const day = date1.dateString.split(" ")[0];
          if (day === "Sun") {
            if (!cte(0)) {
             return res.status(201).json({day: "Sunday"})
            }
          }
          if (day === "Mon") {
            if (!cte(1)) {
             return res.status(201).json({day: "Monday"})
            }
          }
          if (day === "Tue") {
           if (!cte(2)) {
            return res.status(201).json({day: "Tuesday"})
           }
         }
         if (day === "Wed") {
           if (!cte(3)) {
            return res.status(201).json({day: "Wednesday"})
           }
         }
         if (day === "Thu") {
           if (!cte(4)) {
            return res.status(201).json({day: "Thursday"})
           }
         }
         if (day === "Fri") {
           if (!cte(5)) {
            return res.status(201).json({day: "Friday"})
           }
         }
         if (day === "Sat") {
           if (!cte(6)) {
            return res.status(201).json({day: "Saturday"})
            }
          }

        let whiley = startTimeNum;
        let timeNums = [];
        while(whiley < endTimeNum) {
            timeNums.push(whiley);
            whiley++;
        }

        let bookings = await Booking.find({date: date1.dateString, businessId: req.body.businessId});
        let groups = await Group.find({date: date1.dateString, businessId: req.body.businessId});
        let allBookings = [...groups, ...bookings];
        const takenColumns = [];
        const employeesWhoCant = [];
        for (let i = 0; i < allBookings.length; i++) {
            let startTime = allBookings[i].time.split("-")[0];
            let endTime = allBookings[i].time.split("-")[1];
            let startTimeNum = utils.stringToIntTime[startTime];
            let endTimeNum = utils.stringToIntTime[endTime];
            const nums = [];
            let whiley = startTimeNum;
            while(whiley < endTimeNum) {
                nums.push(whiley);
                whiley++;
            }
            if (timeNums.some(iNum => nums.includes(iNum))) {
                takenColumns.push(Number(allBookings[i].bcn));
                if (allBookings[i].employeeBooked) {
                  employeesWhoCant.push(allBookings[i].employeeBooked.toString());
                }
            }
        }
        let bcn = Number(business.bookingColumnNumber);
      
        for (let t = 0; t < employeesWhoCant.length; t++) {
          let index = businessProfile.employeesWhoAccepted.findIndex(ewa => ewa.toString() === employeesWhoCant[t].toString());
          if (index > -1) {
            businessProfile.employeesWhoAccepted.splice(index, 1);
          }
      }
        let i = 1;
        let bcnArray = [];
        while (i <= bcn) {
            bcnArray.push(i);
            i++;
        }
        for (let i = 0; i <= takenColumns.length; i++) {
            if (bcnArray.includes(takenColumns[i])) {
                bcnArray.splice(takenColumns[i] - 1, 1);
            }
        }
       const employees = await Employee.find({_id: businessProfile.employeesWhoAccepted}).select(["fullName", "_id"]);
       console.log(employees)
       console.log(businessProfile)
       if (employees.length > 0) {
        return res.status(200).json({employees, bcnArray, date: date1.dateString})
       }
       else {
         console.log("huh?")
         return res.status(406).send();
       }
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
                viableShifts.push(shifts[i]); // adding it into viable shifts
              }
              else if (timeStartNum >= breakEndNum) { // making sure it starts after the break
                viableShifts.push(shifts[i]);
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
        const bookings = await Booking.find({ employeeBooked: viableShifts[y].employeeId, businessId: req.body.businessId, date: date1.dateString }).select(["time"]);
        const groups = await Group.find({employeeBooked: viableShifts[y].employeeId, businessId: req.body.businessId, date: date1.dateString }).select(["time"]);
        const allBookings = [...groups, ...bookings];
        for (let q = 0; q < allBookings.length; q++) {
          let timeSplit = allBookings[q].time.split("-");
          let start = timeSplit[0];
          let end = timeSplit[1];
          for (let h = utils.stringToIntTime[start]; h < utils.stringToIntTime[end]; h++) {
            employeeArray.push(h);
          }
        }
        things.push(employeeArray);
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
        let employees = await Employee.find({ _id: employeesAvailable }).select(["fullName"])
        return res.status(200).json({ employees, date: date1.dateString });
      } else {
        console.log("do i print????")
        return res.status(406).send()
      }
    }
  } catch (error) {
    console.log(error)
  }
})



router.post('/clone', async (req, res) => {
  try {
    let date1 = utils.getStringDateTime(req.body.timeChosen, req.body.date);  // date String
    let dateToUse = new Date(date1.date);
    if (new Date() > dateToUse) {
      return res.status(409).send(); // if date has past
    }
    let date = new Date(req.body.date).toDateString(); // dateString; dont really need to do thi idt wait actually yeah i do
    const userBookings = await Booking.find({customer: req.body.userId});   // getting bookings that user has

    for (let i = 0; i < userBookings.length; i++) {  
      if (userBookings[i].date === date) {    // basically says if any of the usersBookings fall i nthis date no good
        return res.status(403).send();
      }
    }
    // not the right way to do this
    //  if (userBookings.length === 0) {
    //     const boookedNotis = await BookedNotifications.find({fromId: req.body.userId, potentialDate: date});
    //     const employees = [];
    //     for (let i = 0; i < boookedNotis.length; i++) {
          
    //     }
    //   }



    let services = await ServiceType.find({ _id: req.body.serviceIds });
    let serviceDurationNum = 0;
   
    let shifts = await Shift.find({ businessId: req.body.businessId, shiftDate: date }).select(["timeStart", "timeEnd", "breakStart", "breakEnd", "employeeName", "employeeId"]); // dont use these for a while
     // dont use these for a while  ^^
    for (let l = 0; l < services.length; l++) {
      let timeForEachService = services[l].timeDuration;
      serviceDurationNum += utils.timeDurationStringToInt[timeForEachService];
    }
    // if (req.body.timeDurationNum) {
    //   serviceDurationNum = req.body.timeDurationNum;
    // }
    // else {
    //   return res.status(400).send();
    // }
    const business = await Business.findOne({ _id: req.body.businessId }).select(["eq", "bookingColumnNumber", "schedule"]);
    const businessProfile = await BusinessProfile.findOne({business: business._id});
    if (business.eq === "n") {
      let services = await ServiceType.find({_id: req.body.serviceIds});
        let timeNum = 0;
        for (let i = 0; i < services.length; i++) {
            timeNum += utils.timeDurationStringToInt[services[i].timeDuration];
        }
        const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeChosen] + timeNum];
        const startTimeNum = utils.stringToIntTime[req.body.timeChosen];
        const endTimeNum = utils.stringToIntTime[endTime];

        let whiley = startTimeNum;
        let timeNums = [];
        while(whiley < endTimeNum) {
            timeNums.push(whiley);
            whiley++
        }

       // newShiftCloneDates.push(new Date(dateForLoop.getFullYear(), dateForLoop.getMonth(), dateForLoop.getDate() + (i * 7)).toDateString()); 

       let dates = [];


       for (let i = 0; i <= req.body.cloneNum; i++) {
         dates.push(new Date(date1.date.getFullYear(), date1.date.getMonth(), date1.date.getDate() + (i * req.body.daysBetween)).toDateString());
       }

       console.log(startTimeNum);
        
       console.log(dates);

       function cto(num) {
       if (startTimeNum >= utils.stringToIntTime[business.schedule[num].open]) {
          return true;;
        }
         else {
          return false;
        }
      }

      function cte(num) {
        if (endTimeNum <=  utils.stringToIntTime[business.schedule[num].close]) {
          return true;
        }
        else {
          return false;
        }
      }

       for (let d = 0; d < dates.length; d++) {
         const day = dates[d].split(" ")[0];
         if (day === "Sun") {
           if (!cto(0)) {
            console.log(day)
            return res.status(201).json({openError: "Sunday"})
           }
         }
         if (day === "Mon") {
           if (!cto(1)) {
            console.log(day)
            return res.status(201).json({openError: "Monday"})
           }
         }
         if (day === "Tue") {
          if (!cto(2)) {
            console.log(day)
           return res.status(201).json({openError: "Tuesday"})
          }
        }
        if (day === "Wed") {
          if (!cto(3)) {
            console.log(day)
           return res.status(201).json({openError: "Wednesday"})
          }
        }
        if (day === "Thu") {
          if (!cto(4)) {
            console.log(day)
           return res.status(201).json({openError: "Thursday"})
          }
        }
        if (day === "Fri") {
          if (!cto(5)) {
            console.log(day)
           return res.status(201).json({openError: "Friday"})
          }
        }
        if (day === "Sat") {
          if (!cto(6)) {
            console.log(day)
           return res.status(201).json({openError: "Saturday"})
           }
         }
       }

       for (let d = 0; d < dates.length; d++) {
        const day = dates[d].split(" ")[0];
        console.log(dates[d])
        console.log(day)
        if (day === "Sun") {
          if (!cte(0)) {
            console.log(day)
           return res.status(201).json({day: "Sunday"})
          }
        }
        if (day === "Mon") {
          if (!cte(1)) {
            console.log(day)
           return res.status(201).json({day: "Monday"})
          }
        }
        if (day === "Tue") {
         if (!cte(2)) {
          console.log(day)
          return res.status(201).json({day: "Tuesday"})
         }
       }
       if (day === "Wed") {
         if (!cte(3)) {
          console.log(day)
          return res.status(201).json({day: "Wednesday"})
         }
       }
       if (day === "Thu") {
         if (!cte(4)) {
          console.log(day)
          return res.status(201).json({day: "Thursday"})
         }
       }
       if (day === "Fri") {
         if (!cte(5)) {
          console.log(day)
          return res.status(201).json({day: "Friday"})
         }
       }
       if (day === "Sat") {
         if (!cte(6)) {
          return res.status(201).json({day: "Saturday"})
          }
        }
      }

       let bookings = await Booking.find({date: dates, businessId: req.body.businessId});
       let groups = await Group.find({date: dates, businessId: req.body.businessId});
       const allBookings = [...bookings, ...groups];

      const takenColumns = [];
      const employeesWhoCant = [];
      for (let i = 0; i < allBookings.length; i++) {
            let startTime = allBookings[i].time.split("-")[0];
            let endTime = allBookings[i].time.split("-")[1];
            let startTimeNum = utils.stringToIntTime[startTime];
            let endTimeNum = utils.stringToIntTime[endTime];
            const nums = [];
            let whiley = startTimeNum;
            while(whiley < endTimeNum) {
                nums.push(whiley);
                whiley++;
            }
            if (timeNums.some(iNum => nums.includes(iNum))) {
                takenColumns.push(Number(allBookings[i].bcn));
                employeesWhoCant.push(allBookings[i].employeeBooked.toString());
            }
        }
        let bcn = Number(business.bookingColumnNumber);

        console.log(employeesWhoCant);

        for (let t = 0; t < employeesWhoCant.length; t++) {
          let index = businessProfile.employeesWhoAccepted.findIndex(ewa => ewa.toString() === employeesWhoCant[t].toString());
          if (index > -1) {
            businessProfile.employeesWhoAccepted.splice(index, 1);
          }
      }
  
      // booking
        let i = 1;
        let bcnArray = [];
        while (i <= bcn) {
            bcnArray.push(i);
            i++;
        }
        for (let i = 0; i <= takenColumns.length; i++) {
            if (bcnArray.includes(takenColumns[i])) {
                bcnArray.splice(takenColumns[i] - 1, 1);
            }
        }

        console.log(businessProfile.employeesWhoAccepted);

       const employees = await Employee.find({_id: businessProfile.employeesWhoAccepted}).select(["fullName", "_id"]);
       if (employees.length > 0) {
        return res.status(200).json({employees, bcnArray, dates})
       }
       else {
         return res.status(406).send();
       }
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
        const employeeArray = []; // we have an empty employee array which i dont quite get
        employeeArray.push(viableShifts[y].employeeId); //
        const bookings = await Booking.find({ employeeBooked: viableShifts[y].employeeId, businessId: req.body.businessId, date: date }).select(["time"]);
        const groups = await Group.find({employeeBooked: viableShifts[y].employeeId, businessId: req.body.businessId, date: date }).select(["time"]);
        const allBookings = [...groups, ...bookings];
        for (let q = 0; q < allBookings.length; q++) {
          let timeSplit = allBookings[q].time.split("-");
          // bookings
          let start = timeSplit[0];
          let end = timeSplit[1];
          for (let h = utils.stringToIntTime[start]; h < utils.stringToIntTime[end]; h++) {
            employeeArray.push(h);
          }
        }
        things.push(employeeArray);
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
        let employees = await Employee.find({ _id: employeesAvailable }).select(["fullName"])
        return res.status(200).json({ employees, dates })
      } else {
        return res.status(406).send()
      }
    }
  } catch (error) {
    console.log(error)
  }
})

router.post("/areas", async (req, res) => {
  let date1 = utils.getStringDateTime(req.body.timeChosen, req.body.date);
  console.log(req.body.timeChosen, req.body.date);
  console.log(new Date());
  let dateToUse = new Date(date1.date);
  console.log(dateToUse)
  if (new Date() > dateToUse) {
    return res.status(409).send();
  }

  if (req.body.userId) {
    const admin = await Admin.findOne({ business: req.body.businessId });
    const prevNotis = await BookedNotification.find({_id: admin.bookedNotifications});
    const user = await User.findOne({_id: req.body.userId});
    for (let i = 0; i < prevNotis.length; i++) {
        if (prevNotis[i].potentialDate === date1.dateString && prevNotis[i].fromId.toString() === user._id.toString()) {
            return res.status(403).send();
        }
     }
  }

  let services = await ServiceType.find({ _id: req.body.serviceIds });
  let serviceDurationNum = 0;
  for (let l = 0; l < services.length; l++) {
    let timeForEachService = services[l].timeDuration;
    serviceDurationNum += utils.timeDurationStringToInt[timeForEachService];
  }
  if (req.body.timeDurationNum) {
    serviceDurationNum = req.body.timeDurationNum;
  }
  const business = await Business.findOne({ _id: req.body.businessId }).select(["eq", "bookingColumnNumber", "schedule"]);
  // const businessProfile = await BusinessProfile.findOne({business: business._id});
      let timeNum = 0;
      for (let i = 0; i < services.length; i++) {
          timeNum += utils.timeDurationStringToInt[services[i].timeDuration];
      }
      const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeChosen] + timeNum];
      const startTimeNum = utils.stringToIntTime[req.body.timeChosen];
      const endTimeNum = utils.stringToIntTime[endTime];

      function cte(num) {
        if (endTimeNum <=  utils.stringToIntTime[business.schedule[num].close]) {
          return true;
        }
        else {
          return false;
        }
      }
        const day = date1.dateString.split(" ")[0];
        if (day === "Sun") {
          if (!cte(0)) {
           return res.status(201).json({day: "Sunday"})
          }
        }
        if (day === "Mon") {
          if (!cte(1)) {
           return res.status(201).json({day: "Monday"})
          }
        }
        if (day === "Tue") {
         if (!cte(2)) {
          return res.status(201).json({day: "Tuesday"})
         }
       }
       if (day === "Wed") {
         if (!cte(3)) {
          return res.status(201).json({day: "Wednesday"})
         }
       }
       if (day === "Thu") {
         if (!cte(4)) {
          return res.status(201).json({day: "Thursday"})
         }
       }
       if (day === "Fri") {
         if (!cte(5)) {
          return res.status(201).json({day: "Friday"})
         }
       }
       if (day === "Sat") {
         if (!cte(6)) {
          return res.status(201).json({day: "Saturday"})
          }
        }

      let whiley = startTimeNum;
      let timeNums = [];
      while(whiley < endTimeNum) {
          timeNums.push(whiley);
          whiley++;
      }

      let bookings = await Booking.find({date: date1.dateString, businessId: req.body.businessId});
      let groups = await Group.find({date: date1.dateString, businessId: req.body.businessId});
      let allBookings = [...groups, ...bookings];

      const takenColumns = [];
      for (let i = 0; i < allBookings.length; i++) {
          let startTime = allBookings[i].time.split("-")[0];
          let endTime = allBookings[i].time.split("-")[1];
          let startTimeNum = utils.stringToIntTime[startTime];
          let endTimeNum = utils.stringToIntTime[endTime];
          const nums = [];
          let whiley = startTimeNum;
          while(whiley < endTimeNum) {
              nums.push(whiley);
              whiley++;
          }
    
          for (let t = 0; t < timeNums.length; t++) {
            for (let z = 0; z < nums.length; z++) {
              if (timeNums[t] === nums[z]) {
                if (takenColumns.includes(Number(allBookings[i].bcn))) {
                  console.log("already here")
                }
                else {
                  takenColumns.push(Number(allBookings[i].bcn));
                }
              }
            }
          }
        }
        
      let bcn = Number(business.bookingColumnNumber);
      let i = 1;
      let bcnArray = [];
      while (i <= bcn) {
          bcnArray.push(i);
          i++;
      }
       for (let t = 0; t < takenColumns.length; t++) {
        console.log(takenColumns[t])
        let index = bcnArray.indexOf(takenColumns[t]);
        bcnArray.splice(index, 1);
        console.log(index)
      }
      if (bcnArray.length > 0) {
        return res.status(200).json({ bcnArray: bcnArray, date: date1.dateString})
      }
     else {
       console.log("huh?")
       return res.status(401).send();
     }
})

router.post('/cloneAreas', async (req, res) => {
  try {
    let date1 = utils.getStringDateTime(req.body.timeChosen, req.body.date);  // date String
    let dateToUse = new Date(date1.date);
    if (new Date() > dateToUse) {
      console.log("OH NO")
      return res.status(409).send(); // if date has past
    }
    let date = new Date(req.body.date).toDateString(); // dateString; dont really need to do thi idt wait actually yeah i do
    console.log(date);
    const userBookings = await Booking.find({customer: req.body.userId});   // getting bookings that user has
    for (let i = 0; i < userBookings.length; i++) {  
      if (userBookings[i].date === date) {    // basically says if any of the usersBookings fall i nthis date no good
        return res.status(403).send();
      }
    }
    // not the right way to do this
    //  if (userBookings.length === 0) {
    //     const boookedNotis = await BookedNotifications.find({fromId: req.body.userId, potentialDate: date});
    //     const employees = [];
    //     for (let i = 0; i < boookedNotis.length; i++) {
          
    //     }
    //   }
    let services = await ServiceType.find({ _id: req.body.serviceIds });
    let serviceDurationNum = 0;
   
     // dont use these for a while  ^^
    for (let l = 0; l < services.length; l++) {
      let timeForEachService = services[l].timeDuration;
      serviceDurationNum += utils.timeDurationStringToInt[timeForEachService];
    }
    // if (req.body.timeDurationNum) {
    //   serviceDurationNum = req.body.timeDurationNum;
    // }
    // else {
    //   return res.status(400).send();
    // }
    const business = await Business.findOne({ _id: req.body.businessId }).select(["eq", "bookingColumnNumber", "schedule"]);
    const businessProfile = await BusinessProfile.findOne({business: business._id});
    if (business.eq === "n") {
      let services = await ServiceType.find({_id: req.body.serviceIds});
        let timeNum = 0;
        for (let i = 0; i < services.length; i++) {
            timeNum += utils.timeDurationStringToInt[services[i].timeDuration];
        }
        const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeChosen] + timeNum];
        const startTimeNum = utils.stringToIntTime[req.body.timeChosen];
        const endTimeNum = utils.stringToIntTime[endTime];

        let whiley = startTimeNum;
        let timeNums = [];
        while(whiley < endTimeNum) {
            timeNums.push(whiley);
            whiley++
        }

       // newShiftCloneDates.push(new Date(dateForLoop.getFullYear(), dateForLoop.getMonth(), dateForLoop.getDate() + (i * 7)).toDateString()); 

       let dates = [];


       for (let i = 0; i <= req.body.cloneNum; i++) {
         dates.push(new Date(date1.date.getFullYear(), date1.date.getMonth(), date1.date.getDate() + (i * req.body.daysBetween)).toDateString());
       }

       function cto(num) {
       if (startTimeNum >= utils.stringToIntTime[business.schedule[num].open]) {
          return true;;
        }
         else {
          return false;
        }
      }

      function cte(num) {
        if (endTimeNum <=  utils.stringToIntTime[business.schedule[num].close]) {
          return true;
        }
        else {
          return false;
        }
      }


       for (let d = 0; d < dates.length; d++) {
         const day = dates[d].split(" ")[0];
         if (day === "Sun") {
           if (!cto(0)) {
            return res.status(201).json({openError: "Sunday"})
           }
         }
         if (day === "Mon") {
           if (!cto(1)) {
            return res.status(201).json({openError: "Monday"})
           }
         }
         if (day === "Tue") {
          if (!cto(2)) {
           return res.status(201).json({openError: "Tuesday"})
          }
        }
        if (day === "Wed") {
          if (!cto(3)) {
           return res.status(201).json({openError: "Wednesday"})
          }
        }
        if (day === "Thu") {
          if (!cto(4)) {
           return res.status(201).json({openError: "Thursday"})
          }
        }
        if (day === "Fri") {
          if (!cto(5)) {
           return res.status(201).json({openError: "Friday"})
          }
        }
        if (day === "Sat") {
          if (!cto(6)) {
           return res.status(201).json({openError: "Saturday"})
           }
         }
       }

       for (let d = 0; d < dates.length; d++) {
        const day = dates[d].split(" ")[0];
        console.log(dates[d])
        if (day === "Sun") {
          if (!cte(0)) {
           return res.status(201).json({day: "Sunday"})
          }
        }
        if (day === "Mon") {
          if (!cte(1)) {    
           return res.status(201).json({day: "Monday"})
          }
        }
        if (day === "Tue") {
         if (!cte(2)) {
          return res.status(201).json({day: "Tuesday"})
         }
       }
       if (day === "Wed") {
         if (!cte(3)) {
          return res.status(201).json({day: "Wednesday"})
         }
       }
       if (day === "Thu") {
         if (!cte(4)) {
          return res.status(201).json({day: "Thursday"})
         }
       }
       if (day === "Fri") {
         if (!cte(5)) {
          return res.status(201).json({day: "Friday"})
         }
       }
       if (day === "Sat") {
         if (!cte(6)) {
          return res.status(201).json({day: "Saturday"})
          }
        }
      }

      const bookings = await Booking.find({date: dates, businessId: req.body.businessId});
      const groups = await Group.find({date: dates, businessId: req.body.businessId});
      const allBookings = [...bookings, ... groups]


      const takenColumns = [];
      for (let i = 0; i < allBookings.length; i++) {
            let startTime = allBookings[i].time.split("-")[0];
            let endTime = allBookings[i].time.split("-")[1];
            let startTimeNum = utils.stringToIntTime[startTime];
            let endTimeNum = utils.stringToIntTime[endTime];
            const nums = [];
            let whiley = startTimeNum;
            while(whiley < endTimeNum) {
                nums.push(whiley);
                whiley++;
            }
            if (timeNums.some(iNum => nums.includes(iNum))) {
                takenColumns.push(Number(bookings[i].bcn));
            }
        }
        let bcn = Number(business.bookingColumnNumber);


  
        let i = 1;
        let bcnArray = [];
        while (i <= bcn) {
            bcnArray.push(i);
            i++;
        }
        for (let i = 0; i <= takenColumns.length; i++) {
            if (bcnArray.includes(takenColumns[i])) {
                bcnArray.splice(takenColumns[i] - 1, 1);
            }
        }
       if (bcnArray.length > 0) {
        return res.status(200).json({bcnArray, dates})
       }
       else {
         return res.status(406).send();
       }
    }
  } catch (error) {
    console.log(error)
  }
})



router.post("/editBooking", adminAuth, async (req, res) => {
  try {
    let booking = await Booking.findOne({ _id: req.body.bookingId }); // booking
    let bookingTimeArray = booking.time.split("-"); // array split
    let business = await Business.findOne({ _id: booking.businessId }).select(["eq", "schedule"]); // business
    const previousServiceTypes = [...booking.serviceType]; // previous
    const newServiceTypes = [...previousServiceTypes, ...req.body.servicesToAdd]; // serviceIDsAdded Together
    let newServices = await ServiceType.find({ _id: newServiceTypes });
    booking.serviceType = newServiceTypes;
      // check this // see if employee is working anywhere else before extension
      let bookings = await Booking.find({ date: booking.date, businessId: booking.businessId }); // getting all the bookings that have the same date as this booking?
      let counterNum = 0;
      
      for (let i = 0; i < newServices.length; i++) {
        counterNum += utils.timeDurationStringToInt[newServices[i].timeDuration];
      }
      let bookingsWithCurrentRemoved = bookings.filter((element, index) => {
        return element._id.toString() !== booking._id.toString();
      });
      
      const indexStart = utils.stringToIntTime[bookingTimeArray[0]];
      
      for (let index = indexStart; index < indexStart + counterNum; index++) {
        
        for (let i = 0; i < bookingsWithCurrentRemoved.length; i++) {
          
          let timeArray = bookingsWithCurrentRemoved[i].time.split("-");
          
          
          if (utils.intToStringTime[index] === utils.intToStringTime[utils.stringToIntTime[timeArray[0]]]) {
            return res.status(400).send();
          }
        }
      }

      const day = new Date(booking.date).getDay();
      const timeEnd = utils.stringToIntTime[business.schedule[day].close];
      console.log(timeEnd);
      console.log(utils.stringToIntTime[booking.time.split("-")[0]] + counterNum > timeEnd)
      if (utils.stringToIntTime[booking.time.split("-")[0]] + counterNum > timeEnd) {
        return res.status(406).send();
      }

      

  
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

router.post("/editBookingEmployee", employeeAuth, async (req, res) => {
  try {
    console.log(req.employee);
    console.log("THIS IS THE EMPLOYEE");
    let booking = await Booking.findOne({ _id: req.body.bookingId }); // booking
    let bookingTimeArray = booking.time.split("-"); // array split
    let business = await Business.findOne({ _id: booking.businessId }).select(["eq", "schedule"]); // business
    const previousServiceTypes = [...booking.serviceType]; // previous
    const newServiceTypes = [...previousServiceTypes, ...req.body.servicesToAdd]; // serviceIDsAdded Together
    let newServices = await ServiceType.find({ _id: newServiceTypes });
    booking.serviceType = newServiceTypes;
      // check this // see if employee is working anywhere else before extension
      let bookings = await Booking.find({ date: booking.date, businessId: booking.businessId }); // getting all the bookings that have the same date as this booking?
      let counterNum = 0;
      
      for (let i = 0; i < newServices.length; i++) {
        counterNum += utils.timeDurationStringToInt[newServices[i].timeDuration];
      }
      let bookingsWithCurrentRemoved = bookings.filter((element, index) => {
        return element._id.toString() !== booking._id.toString();
      });
      
      const indexStart = utils.stringToIntTime[bookingTimeArray[0]];
      
      for (let index = indexStart; index < indexStart + counterNum; index++) {
        
        for (let i = 0; i < bookingsWithCurrentRemoved.length; i++) {
          
          let timeArray = bookingsWithCurrentRemoved[i].time.split("-");
          
          
          if (utils.intToStringTime[index] === utils.intToStringTime[utils.stringToIntTime[timeArray[0]]]) {
            return res.status(400).send();
          }
        }
      }

      const day = new Date(booking.date).getDay();
      const timeEnd = utils.stringToIntTime[business.schedule[day].close];
      console.log(timeEnd);
      console.log(utils.stringToIntTime[booking.time.split("-")[0]] + counterNum > timeEnd)
      if (utils.stringToIntTime[booking.time.split("-")[0]] + counterNum > timeEnd) {
        return res.status(406).send();
      }

      

  
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
  let bookings = await Booking.find({ bcn: req.body.bcn, date: date, businessId: req.body.businessId });
  let timeNumber = utils.stringToIntTime[req.body.time];
  if (timeNumber === undefined) {
    let fifteenMinuteTimeArray = req.body.time.split("-");
    timeNumber = utils.stringToIntTime[fifteenMinuteTimeArray[0]];
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
