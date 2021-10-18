const router = require('express').Router();
const Shift = require('../../models/Shift')
const Booking = require('../../models/Booking');
const User = require('../../models/User');
const Business = require('../../models/Business');
const Employee = require('../../models/Employee');
const ServiceType = require('../../models/ServiceType');
const utils = require('../../utils/utils');
const adminAuth = require("../../middleware/authAdmin");

router.post('/multiplecreate', async (req, res) => {
  console.log(req.body)
  let date = new Date(req.body.shiftDate).toDateString();
  let newShiftCloneDates = []
  let dateForLoop = new Date(date)
  for (let i = 0; i < req.body.cloneNumber; i++) {
    newShiftCloneDates.push(new Date(dateForLoop.getFullYear(), dateForLoop.getMonth(), dateForLoop.getDate() + (i * 7)).toDateString());
  }

  for (let i = 0; i < newShiftCloneDates.length; i++) {
    let areaConflict = await Shift.find({ bookingColumnNumber: req.body.bookingColumnNumber, shiftDate: newShiftCloneDates[i] });
    if (areaConflict.length) {
      for (let i = 0; i < areaConflict.length; i++) {
        let alreadyExistingStart = utils.stringToIntTime[areaConflict[i].timeStart];
        let alreadyExistingEnd = utils.stringToIntTime[areaConflict[i].timeEnd];

        if (startNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          console.log(startNum, alreadyExistingStart)
          console.log(endNum, alreadyExistingEnd)
          return res.status(406).send()
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          console.log("bm")
          return res.status(406).send()
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          console.log("scm")
          return res.status(406).send()
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          console.log("stm")
          return res.status(406).send()
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
          console.log(startNum, alreadyExistingStart)
          console.log(endNum, alreadyExistingEnd)
          return res.status(406).send()
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          console.log("bm")
          return res.status(406).send()
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          console.log("scm")
          return res.status(406).send()
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          console.log("stm")
          return res.status(406).send()
        }
      }
    }
    else {
      const newShift = new Shift({
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
      await newShift.save();
    }
  }
  res.status(201).send()
})


router.post('/create', async (req, res) => {
  try {
    console.log(req.body);
    console.log("req.body above")
    let date = new Date(req.body.shiftDate).toDateString();
    const areaConflict = await Shift.find({ businessId: req.body.businessId, bookingColumnNumber: req.body.bookingColumnNumber, shiftDate: date });
    const shiftConflict = await Shift.find({ employeeId: req.body.employeeId, shiftDate: date });
    if (areaConflict.length > 0) {
      let startNum = utils.stringToIntTime[req.body.timeStart];
      let endNum = utils.stringToIntTime[req.body.timeEnd];

      for (let i = 0; i < areaConflict.length; i++) {
        let alreadyExistingStart = utils.stringToIntTime[areaConflict[i].timeStart];
        let alreadyExistingEnd = utils.stringToIntTime[areaConflict[i].timeEnd];

        if (startNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          console.log("winter time")
          return res.status(406).send();
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          console.log(areaConflict)
          console.log(startNum, "startNum");
          console.log(endNum, "endNum")
          return res.status(406).send();
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          console.log("oh me")
          return res.status(406).send();
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          console.log("summer time")
          return res.status(406).send();
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
          console.log("winter time")
          return res.status(406).send()
        }
        else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {
          console.log("here?")
          console.log("fall time")
          return res.status(406).send()
        }
        else if (startNum >= alreadyExistingStart && startNum <= alreadyExistingEnd) {
          console.log("oh me")
          return res.status(406).send()
        }
        else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
          console.log("summer time")
          return res.status(406).send()
        }
      }
    }

    const newShift = new Shift({
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
    await newShift.save();
    console.log(newShift)
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
  let date = new Date(req.body.shiftDate).toDateString();
  console.log(date)
  const shifts = await Shift.find({ shiftDate: date, businessId: req.body.businessId }).select(["employeeName", "timeStart", "timeEnd"])
  if (shifts.length > 0) {
    res.status(200).json({ shifts })
  }
  else {
    res.status(204).send();
  }
})

router.post('/getEmployeeBookingsForDay', async (req, res) => {
  let date = new Date(req.body.date).toDateString();
  const employee = await Employee.findOne({ _id: req.body.employeeId });
  const business = await Business.findOne({ _id: employee.businessWorkingAt });
  const shift = await Shift.findOne({ employeeId: req.body.employeeId, shiftDate: date })
  if (!shift) {
    console.log("NO SHIFT")
    return res.status(406).send()
  }
  else {
    const bookings = await Booking.find({ employeeBooked: req.body.employeeId, date: date });
    const updatedWithNameBookings = [];
    const bcn = shift.bookingColumnNumber;
    const bct = business.bookingColumnType;
    if (bookings.length) {
      console.log(bookings)
      for (let i = 0; i < bookings.length; i++) {
        let user = await User.findOne({ _id: bookings[i].customer });
        let updatedWithNameBooking = {};
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
      console.log("paige")
      console.log(updatedWithNameBookings)
      return res.status(200).json({ bookings: updatedWithNameBookings, bct })
    }
    else {
      console.log("no bookings")
      console.log("NO BOOKINGS")
      let shiftTimes = { start: shift.timeStart, end: shift.timeEnd };
      res.status(206).send({ shiftTimes });
    }
  }
})

router.post('/deleteOne', adminAuth, async (req, res) => {
  if (req.admin) {
    let shift = await Shift.findOne({ _id: req.body.shiftId });
    if (shift) {
      await Shift.deleteOne({ _id: req.body.shiftId });
      res.status(200).send();
    }
  }
})




module.exports = router;