const router = require('express').Router();
const Shift = require('../../models/Shift')
const Booking = require('../../models/Booking');
const User = require('../../models/User');
const Business = require('../../models/Business');
const Employee = require('../../models/Employee');
const ServiceType = require('../../models/ServiceType');
const utils = require('../../utils/utils');
const adminAuth = require("../../middleware/authAdmin");
const Notification = require("../../models/Notification");

router.post('/multiplecreate', async (req, res) => {
  let date = new Date(req.body.shiftDate).toDateString(); // get the date string
  let newShiftCloneDates = []  // empty array to hold clone shifts in
  let dateForLoop = new Date(date); // purple date
  for (let i = 0; i < req.body.cloneNumber; i++) {
    newShiftCloneDates.push(new Date(dateForLoop.getFullYear(), dateForLoop.getMonth(), dateForLoop.getDate() + (i * 7)).toDateString()); // doing the * 7 thing to change the dates
  }

  const employeeForBusiness = await Employee.findOne({_id: req.body.employeeId}).select(["businessWorkingAt"]);
  const businessForEq = await Business.findOne({_id: employeeForBusiness.businessWorkingAt}).select(["eq"]);
  for (let i = 0; i < newShiftCloneDates.length; i++) { // number of clones based on clone num
    if (businessForEq.eq === "y") {
    let areaConflict = await Shift.find({ bookingColumnNumber: req.body.bookingColumnNumber, shiftDate: newShiftCloneDates[i] }); 
    // area conflict needs to also be looked at through employees bc some shifts may not have a bct which is annoying but whatever
    if (areaConflict.length) {
      let startNum = utils.stringToIntTime[req.body.timeStart];
      let endNum = utils.stringToIntTime[req.body.timeEnd];
      for (let i = 0; i < areaConflict.length; i++) {
        let alreadyExistingStart = utils.stringToIntTime[areaConflict[i].timeStart];
        let alreadyExistingEnd = utils.stringToIntTime[areaConflict[i].timeEnd];
        if (startNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
      }
    }
  }
    let shiftConflict = await Shift.find({ employeeId: req.body.employeeId, shiftDate: newShiftCloneDates[i] });
    if (shiftConflict.length) {
      let startNum = utils.stringToIntTime[req.body.timeStart];
      let endNum = utils.stringToIntTime[req.body.timeEnd];

      for (let i = 0; i < shiftConflict.length; i++) {
        let alreadyExistingStart = utils.stringToIntTime[shiftConflict[i].timeStart];
        let alreadyExistingEnd = utils.stringToIntTime[shiftConflict[i].timeEnd];

        if (startNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          // ee stands for employee issue
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
      }
    }
    else {

      let newShift;

      if (req.body.bookingColumnNumber) {
        newShift = new Shift({
          shiftDate: newShiftCloneDates[i],
          timeStart: req.body.timeStart,
          timeEnd: req.body.timeEnd,
          employeeId: req.body.employeeId,
          employeeName: req.body.employeeName,
          shiftDuration: req.body.shiftDuration,
          businessId: req.body.businessId,
          isBreak: req.body.isBreak,
          breakEnd: req.body.breakEnd,
          breakStart: req.body.breakStart,
          bookingColumnNumber: req.body.bookingColumnNumber
        })
      }
      else {
        newShift = new Shift({
          shiftDate: newShiftCloneDates[i],
          timeStart: req.body.timeStart,
          timeEnd: req.body.timeEnd,
          employeeId: req.body.employeeId,
          employeeName: req.body.employeeName,
          shiftDuration: req.body.shiftDuration,
          businessId: req.body.businessId,
          isBreak: req.body.isBreak,
          breakEnd: req.body.breakEnd,
          breakStart: req.body.breakStart,
          bookingColumnNumber: req.body.bookingColumnNumber
        })
      }
      await newShift.save();
    }
  }
  res.status(201).send()
})

router.post('/edit', async (req, res) => {
  try {

    let date = new Date(req.body.shiftDate).toDateString();
    const originalShift = await Shift.findOne({_id: req.body.shiftId});
    const areaConflict = await Shift.find({ businessId: req.body.businessId, bookingColumnNumber: req.body.bookingColumnNumber, shiftDate: date });
    const areaConflictIndex = areaConflict.findIndex(e =>  {
      return e._id.toString() === originalShift._id.toString();
    });
    if (areaConflictIndex !== -1) {
      areaConflict.splice(areaConflictIndex, 1);
    }
    const shiftConflict = await Shift.find({ employeeId: req.body.employeeId, shiftDate: date });
    
    const shiftConflictIndex = shiftConflict.findIndex(e => {


      return e._id.toString() === originalShift._id.toString();
    })
    if (shiftConflictIndex !== -1) {
      shiftConflict.splice(shiftConflictIndex, 1);
    }
 
   // console.log(shiftConflict[0].employeeId, "shiftconem")
    const employeeForBusiness = await Employee.findOne({_id: req.body.employeeId}).select(["businessWorkingAt"]);
    const businessForEq = await Business.findOne({_id: employeeForBusiness.businessWorkingAt}).select(["eq"]);
    if (businessForEq.eq === "y") {
    if (areaConflict.length > 0) {
      let startNum = utils.stringToIntTime[req.body.timeStart];
      let endNum = utils.stringToIntTime[req.body.timeEnd];
      for (let i = 0; i < areaConflict.length; i++) {
        let alreadyExistingStart = utils.stringToIntTime[areaConflict[i].timeStart];
        let alreadyExistingEnd = utils.stringToIntTime[areaConflict[i].timeEnd];

        if (startNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
      }
    }
  }
    if (shiftConflict.length > 0) {
      let startNum = utils.stringToIntTime[req.body.timeStart];
      let endNum = utils.stringToIntTime[req.body.timeEnd];

      for (let i = 0; i < shiftConflict.length; i++) {
        let alreadyExistingStart = utils.stringToIntTime[shiftConflict[i].timeStart];
        let alreadyExistingEnd = utils.stringToIntTime[shiftConflict[i].timeEnd];

        if (startNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
      }
    }

    originalShift.date = date;
    originalShift.timeStart = req.body.timeStart;
    originalShift.timeEnd = req.body.timeEnd;
    originalShift.employeeId = req.body.employeeId;
    originalShift.employeeName = req.body.employeeName;
    originalShift.businessId = req.body.businessId;
    console.log(req.body);
    if (req.body.isBreak && req.body.breakStart && req.body.breakEnd) {
      originalShift.isBreak = req.body.isBreak;
      originalShift.breakStart = req.body.breakStart;
      originalShift.breakEnd = req.body.breakEnd;
      console.log(req.body);
    }
    if (originalShift.isBreak && !req.body.isBreak) {
        originalShift.isBreak = false;
        originalShift.breakStart = undefined;
        originalBreak.breakEnd = undefined;
    }
    if (req.body.bookingColumnNumber) {
      originalShift.bookingColumnNumber = req.body.bookingColumnNumber;
    }

    await originalShift.save();

    // if (req.body.bookingColumnNumber) {
    //   newShift = new Shift({
    //     shiftDate: date,
    //     timeStart: req.body.timeStart,
    //     timeEnd: req.body.timeEnd,
    //     employeeId: req.body.employeeId,
    //     employeeName: req.body.employeeName,
    //     businessId: req.body.businessId,
    //     isBreak: req.body.isBreak,
    //     breakEnd: req.body.breakEnd,
    //     breakStart: req.body.breakStart,
    //     bookingColumnNumber: req.body.bookingColumnNumber
    //   })
    // }
    // else {
    //   newShift = new Shift({
    //     shiftDate: date,
    //     timeStart: req.body.timeStart,
    //     timeEnd: req.body.timeEnd,
    //     employeeId: req.body.employeeId,
    //     employeeName: req.body.employeeName,
    //     businessId: req.body.businessId,
    //     isBreak: req.body.isBreak,
    //     breakEnd: req.body.breakEnd,
    //     breakStart: req.body.breakStart,
    //     bookingColumnNumber: req.body.bookingColumnNumber
    //   })
    // }
  
    // await newShift.save();
    // console.log(newShift)
    // res.status(201).send()
    res.status(200).send();
  }
  catch (error) {
    console.log(error)
  }
});

router.post("/breaksForDay", adminAuth, async (req, res) => {
  const date = new Date(req.body.date).toDateString();
  const shifts = await Shift.find({businessId: req.admin.businessId, shiftDate: date});
  const breaksForDay = [];
  shifts.forEach(function(eachShift) {
    if (eachShift.breakStart && eachShift.breakEnd) {
      breaksForDay.push({time: `${eachShift.breakStart}-${eachShift.breakEnd}`, bcn: eachShift.bookingColumnNumber});
    }
  });
 return res.status(200).json({breaks: breaksForDay})
})

router.post('/create', async (req, res) => {
  try {
    let date = new Date(req.body.shiftDate).toDateString();
    const areaConflict = await Shift.find({ businessId: req.body.businessId, bookingColumnNumber: req.body.bookingColumnNumber, shiftDate: date });
    const shiftConflict = await Shift.find({ employeeId: req.body.employeeId, shiftDate: date });
    const employeeForBusiness = await Employee.findOne({_id: req.body.employeeId}).select(["businessWorkingAt"]);
    const businessForEq = await Business.findOne({_id: employeeForBusiness.businessWorkingAt}).select(["eq"]);
    if (businessForEq.eq === "y") {
    if (areaConflict.length > 0) {
      let startNum = utils.stringToIntTime[req.body.timeStart];
      let endNum = utils.stringToIntTime[req.body.timeEnd];
      for (let i = 0; i < areaConflict.length; i++) {
        let alreadyExistingStart = utils.stringToIntTime[areaConflict[i].timeStart];
        let alreadyExistingEnd = utils.stringToIntTime[areaConflict[i].timeEnd];

        if (startNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: "ebcn", date: areaConflict[i].shiftDate});
        }
      }
    }
  }
    if (shiftConflict.length > 0) {
      let startNum = utils.stringToIntTime[req.body.timeStart];
      let endNum = utils.stringToIntTime[req.body.timeEnd];

      for (let i = 0; i < shiftConflict.length; i++) {
        let alreadyExistingStart = utils.stringToIntTime[shiftConflict[i].timeStart];
        let alreadyExistingEnd = utils.stringToIntTime[shiftConflict[i].timeEnd];

        if (startNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          return res.status(406).json({error: `ee`, date: shiftConflict[i].shiftDate});
        }
      }
    }

    let newshift;

    if (req.body.bookingColumnNumber) {
      newShift = new Shift({
        shiftDate: date,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        shiftDuration: req.body.shiftDuration,
        businessId: req.body.businessId,
        isBreak: req.body.isBreak,
        breakEnd: req.body.breakEnd,
        breakStart: req.body.breakStart,
        bookingColumnNumber: req.body.bookingColumnNumber
      })
    }
    else {
      newShift = new Shift({
        shiftDate: date,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        shiftDuration: req.body.shiftDuration,
        businessId: req.body.businessId,
        isBreak: req.body.isBreak,
        breakEnd: req.body.breakEnd,
        breakStart: req.body.breakStart,
        bookingColumnNumber: req.body.bookingColumnNumber
      })
    }
  
    await newShift.save();
    res.status(201).send()
  }
  catch (error) {
    console.log(error)
  }
});


router.post('/employee', async (req, res) => {
  const shift = await Shift.find({ shiftDate: req.body.date, employeeId: req.body.employeeId }).select(['timeStart', 'timeEnd', 'breakStart', 'breakEnd', 'bookingColumnNumber']);

  if (shift.length > 1) {

    shift.sort(function (a, b) {
      let newA = new Date(`${new Date().getFullYear()}, ${new Date().getMonth()}, ${new Date().getDate()}, ${a.timeStart}`)
      let newB = new Date(`${new Date().getFullYear()}, ${new Date().getMonth()}, ${new Date().getDate()}, ${b.timeStart}`)
      return newA > newB
    })

    let firstShiftStarts = shift[0].timeStart;
    let firstShiftEnds = shift[0].timeEnd;
    let secondShiftStarts = shift[1].timeStart;
    let secondShiftEnds = shift[1].timeEnd;
    let firstBreakStarts;
    let firstBreakEnds;
    let onlyBreakStarts;
    let onlyBreakEnds;
    let secondBreakStarts;
    let secondBreakEnds;
    if (shift[0].breakStart && shift[0].breakEnd && !shift[1].breakStart && !shift[1].breakEnd) {
      onlyBreakStarts = shift[0].breakStart;
      onlyBreakEnds = shift[0].breakEnd;
    }
    else if (!shift[0].breakStart && !shift[0].breakEnd && shift[1].breakStart && shift[1].breakEnd) {
      onlyBreakStarts = shift[1].breakStart;
      onlyBreakEnds = shift[1].breakEnd;
    }

    else if (shift[0].breakStart && shift[0].breakEnd && shift[1].breakStart && shift[1].breakEnd) {
      firstBreakStarts = shift[0].breakStart;
      firstBreakEnds = shift[0].breakEnd;
      secondBreakStarts = shift[1].breakStart;
      secondBreakEnds = shift[1].breakEnd;
    }

    if (!onlyBreakEnds && !onlyBreakStarts && !firstBreakEnds && !firstBreakStarts && !secondBreakEnds && !secondBreakStarts && firstShiftStarts && firstShiftEnds && secondShiftStarts && secondShiftEnds) {
      res.status(200).json({ scheduled: true, twoShifts: true, firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds })
    }
    if (onlyBreakEnds && onlyBreakStarts) {
      res.status(200).json({ scheduled: true, oneBreak: true, twoShifts: true, onlyBreakEnds, onlyBreakStarts, firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds })
    }
    else if (firstBreakStart && secondBreakStart && secondBreakEnds && firstBreakEnds) {
      res.status(200).json({ scheduled: true, twoBreaks: true, twoShifts: true, firstBreakStarts, firstBreakEnds, secondBreakStarts, secondBreakEnds, firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds })
    }
  } else if (shift.length === 1) {
    let onlyBreakStarts;
    let onlyBreakEnds;
    let onlyShiftStarts = shift[0].timeStart;
    let onlyShiftEnds = shift[0].timeEnd;
    if (shift[0].breakStart && shift[0].breakEnd) {
      onlyBreakStarts = shift[0].breakStart;
      onlyBreakEnds = shift[0].breakEnd;
      res.status(200).json({ scheduled: true, oneBreak: true, oneShift: true, onlyBreakEnds, onlyBreakStarts, onlyShiftStarts, onlyShiftEnds })
    }
    else {
      res.status(200).json({ scheduled: true, oneShift: true, onlyShiftStarts, onlyShiftEnds })
    }

  } else {
    res.status(200).json({ scheduled: false })
  }
})


router.post('/get', async (req, res) => {
  try {
     let date = new Date(req.body.shiftDate).toDateString();
     const shifts = await Shift.find({ shiftDate: date, businessId: req.body.businessId }).select(["employeeName", "timeStart", "timeEnd", "shiftDate", "breakStart", "breakEnd", "bookingColumnNumber", "employeeId"]);
     return res.status(200).json({ shifts });
  }
  catch(error) {
    res.status(400).send();
    print(error)
   }
})

router.post('/getEmployeeBookingsForDay', async (req, res) => {
  let date = new Date(req.body.date).toDateString();
  const employee = await Employee.findOne({ _id: req.body.employeeId });
  const business = await Business.findOne({ _id: employee.businessWorkingAt });
  const shift = await Shift.findOne({ employeeId: req.body.employeeId, shiftDate: date });
  if (business.eq === "y" && !shift) {
      return res.status(406).send()
  }
  else {
    const bookings = await Booking.find({ employeeBooked: req.body.employeeId, date: date });
    const updatedWithNameBookings = [];
    let bcn;
    let breakStart;
    let breakEnd;
    if (shift) {
      if (shift.breakStart && shift.breakEnd) {
        breakStart = shift.breakStart;
        breakEnd = shift.breakEnd;
      }
      bcn = shift.bookingColumnNumber;
    }
    const bct = business.bookingColumnType;
    if (bookings.length) {
      for (let i = 0; i < bookings.length; i++) {
        let user = await User.findOne({ _id: bookings[i].customer });
        let updatedWithNameBooking = {};
        if (!bcn) {
          bcn = bookings[i].bcn;
        }
        updatedWithNameBooking.bcn = bcn;
        updatedWithNameBooking.employeeBooked = bookings[i].employeeBooked;
        updatedWithNameBooking.cName = user.fullName;
        updatedWithNameBooking.serviceType = bookings[i].serviceType;
        updatedWithNameBooking.serviceNames = []
        let serviceTypes = await ServiceType.find({ _id: bookings[i].serviceType });
        for (let t = 0; t < serviceTypes.length; t++) {
          updatedWithNameBooking.serviceNames.push(serviceTypes[t].serviceName)
        }
        updatedWithNameBooking.cost = bookings[i].cost;
        updatedWithNameBooking.businessId = bookings[i].businessId;
        updatedWithNameBooking.customer = bookings[i].customer;
        updatedWithNameBooking.date = bookings[i].date;
        updatedWithNameBooking.time = bookings[i].time;
        updatedWithNameBooking._id = bookings[i]._id;
        updatedWithNameBookings.push(updatedWithNameBooking);
      }
      let shiftTimes;
      if (shift && shift.timeStart && shift.timeEnd) {
        shiftTimes = { start: shift.timeStart, end: shift.timeEnd };
      } 
      if (breakStart && breakEnd) {
        return res.status(200).json({shiftTimes, bookings: updatedWithNameBookings, bct, breakTime: `${breakStart}-${breakEnd}` })
      }
      return res.status(200).json({shiftTimes, bookings: updatedWithNameBookings, bct })
    } else if (!bookings.length && business.eq === "n") {
      return res.status(205).send();
    }
    else {
      let bcn;
      let bct;
      if (shift.bookingColumnNumber) {
        bcn = shift.bookingColumnNumber;
        bct = business.bookingColumnType;
      }
      let shiftTimes = { start: shift.timeStart, end: shift.timeEnd };
      if (shift.breakStart && shift.breakEnd) {
        if (bcn) {
          return res.status(206).json({shiftTimes, breakStart: shift.breakStart, breakEnd: shift.breakEnd, bcn, bct});
        }
        else {
          return res.status(202).json({shiftTimes, breakStart: shift.breakStart, breakEnd: shift.breakEnd});
        }
      }
      else {
        if (bcn) {
          return res.status(201).json({shiftTimes, bcn, bct,});
        }
        else {
          return res.status(203).json({shiftTimes});
        }
      }
    }
  }
})

router.post('/deleteOne', adminAuth, async (req, res) => {
  if (req.admin) {
    const shift = await Shift.findOne({ _id: req.body.shiftId });
    const employee = await Employee.findOne({_id: shift.employeeId});
    const business = await Business.findOne({_id: req.admin.businessId})
    let date = new Date();
    const notification = new Notification({
      date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
      fromId: business.businessId,
      type: "BDS",
      fromString: business.businessName
    });
    await notification.save();
    const employeeNotifications = [...employee.notifications];
    employeeNotifications.push(notification);
    employee.notifications = employeeNotifications;
    await employee.save();
    if (shift) {
      await Shift.deleteOne({ _id: req.body.shiftId });
      res.status(200).send();
    }
  }
})


module.exports = router;