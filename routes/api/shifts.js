const router = require('express').Router();
const Shift = require('../../models/Shift')
const Booking = require('../../models/Booking')

router.post('/multiplecreate', async (req, res) => {
  if (!req.body.shiftDates) {

  }

  for (let i = 0; i < req.body.shiftDates.length; i++) {
    let shiftConflict = await Shift.find({ employeeId: req.body.employeeId, shiftDate: req.body.shiftDates[i] })
    console.log(shiftConflict)
    if (shiftConflict.length) {
      function convertShiftTimes(numberTime) {
        let num = null;
        if (numberTime === "12:00 AM") {
          num = 0;
        } else if (numberTime === "12:30 AM") {
          num = 2;
        } else if (numberTime === "1:00 AM") {
          num = 4;
        } else if (numberTime === "1:30 AM") {
          num = 6;
        } else if (numberTime === "2:00 AM") {
          num = 8;
        } else if (numberTime === "2:30 AM") {
          num = 10;
        } else if (numberTime === "3:00 AM") {
          num = 12;
        } else if (numberTime === "3:30 AM") {
          num = 14;
        } else if (numberTime === "4:00 AM") {
          num = 16;
        } else if (numberTime === "4:30 AM") {
          num = 18;
        } else if (numberTime === "5:00 AM") {
          num = 20;
        } else if (numberTime === "5:30 AM") {
          num = 22;
        } else if (numberTime === "6:00 AM") {
          num = 24;
        } else if (numberTime === "6:30 AM") {
          num = 26;
        } else if (numberTime === "7:00 AM") {
          num = 28;
        } else if (numberTime === "7:30 AM") {
          num = 30;
        } else if (numberTime === "8:00 AM") {
          num = 32;
        } else if (numberTime === "8:30 AM") {
          num = 34;
        } else if (numberTime === "9:00 AM") {
          num = 36;
        } else if (numberTime === "9:30 AM") {
          num = 38;
        } else if (numberTime === "10:00 AM") {
          num = 40;
        } else if (numberTime === "10:30 AM") {
          num = 42;
        } else if (numberTime === "11:00 AM") {
          num = 44;
        } else if (numberTime === "11:30 AM") {
          num = 46;
        } else if (numberTime === "12:00 PM") {
          num = 48;
        } else if (numberTime === "12:30 PM") {
          num = 50;
        } else if (numberTime === "1:00 PM") {
          num = 52;
        } else if (numberTime === "1:30 PM") {
          num = 54;
        } else if (numberTime === "2:00 PM") {
          num = 56;
        } else if (numberTime === "2:30 PM") {
          num = 58;
        } else if (numberTime === "3:00 PM") {
          num = 60;
        } else if (numberTime === "3:30 PM") {
          num = 62;
        } else if (numberTime === "4:00 PM") {
          num = 64;
        } else if (numberTime === "4:30 PM") {
          num = 66;
        } else if (numberTime === "5:00 PM") {
          num = 68;
        } else if (numberTime === "5:30 PM") {
          num = 70;
        } else if (numberTime === "6:00 PM") {
          num = 72;
        } else if (numberTime === "6:30 PM") {
          num = 74;
        } else if (numberTime === "7:00 PM") {
          num = 76;
        } else if (numberTime === "7:30 PM") {
          num = 78;
        } else if (numberTime === "8:00 PM") {
          num = 80;
        } else if (numberTime === "8:30 PM") {
          num = 82;
        } else if (numberTime === "9:00 PM") {
          num = 84;
        } else if (numberTime === "9:30 PM") {
          num = 86;
        } else if (numberTime === "10:00 PM") {
          num = 88;
        } else if (numberTime === "10:30 PM") {
          num = 90;
        } else if (numberTime === "11:00 PM") {
          num = 92;
        } else if (numberTime === "11:30 PM") {
          num = 94;
        }
        return num;
      }

      let startNum = convertShiftTimes(req.body.timeStart)
      let endNum = convertShiftTimes(req.body.timeEnd)

      for (let i = 0; i < shiftConflict.length; i++) {
        let alreadyExistingStart = convertShiftTimes(shiftConflict[i].timeStart);
        let alreadyExistingEnd = convertShiftTimes(shiftConflict[i].timeEnd);

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
        shiftDate: req.body.shiftDates[i],
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
      console.log(newShift)
      await newShift.save();
    }
  }
  res.status(201).send()
})


router.post('/create', async (req, res) => {

  const shiftConflict = await Shift.find({ employeeId: req.body.employeeId, shiftDate: req.body.shiftDate })

  if (shiftConflict.length > 0) {
    console.log
    function convertShiftTimes(numberTime) {
      let num = null;
      if (numberTime === "12:00 AM") {
        num = 0;
      } else if (numberTime === "12:30 AM") {
        num = 2;
      } else if (numberTime === "1:00 AM") {
        num = 4;
      } else if (numberTime === "1:30 AM") {
        num = 6;
      } else if (numberTime === "2:00 AM") {
        num = 8;
      } else if (numberTime === "2:30 AM") {
        num = 10;
      } else if (numberTime === "3:00 AM") {
        num = 12;
      } else if (numberTime === "3:30 AM") {
        num = 14;
      } else if (numberTime === "4:00 AM") {
        num = 16;
      } else if (numberTime === "4:30 AM") {
        num = 18;
      } else if (numberTime === "5:00 AM") {
        num = 20;
      } else if (numberTime === "5:30 AM") {
        num = 22;
      } else if (numberTime === "6:00 AM") {
        num = 24;
      } else if (numberTime === "6:30 AM") {
        num = 26;
      } else if (numberTime === "7:00 AM") {
        num = 28;
      } else if (numberTime === "7:30 AM") {
        num = 30;
      } else if (numberTime === "8:00 AM") {
        num = 32;
      } else if (numberTime === "8:30 AM") {
        num = 34;
      } else if (numberTime === "9:00 AM") {
        num = 36;
      } else if (numberTime === "9:30 AM") {
        num = 38;
      } else if (numberTime === "10:00 AM") {
        num = 40;
      } else if (numberTime === "10:30 AM") {
        num = 42;
      } else if (numberTime === "11:00 AM") {
        num = 44;
      } else if (numberTime === "11:30 AM") {
        num = 46;
      } else if (numberTime === "12:00 PM") {
        num = 48;
      } else if (numberTime === "12:30 PM") {
        num = 50;
      } else if (numberTime === "1:00 PM") {
        num = 52;
      } else if (numberTime === "1:30 PM") {
        num = 54;
      } else if (numberTime === "2:00 PM") {
        num = 56;
      } else if (numberTime === "2:30 PM") {
        num = 58;
      } else if (numberTime === "3:00 PM") {
        num = 60;
      } else if (numberTime === "3:30 PM") {
        num = 62;
      } else if (numberTime === "4:00 PM") {
        num = 64;
      } else if (numberTime === "4:30 PM") {
        num = 66;
      } else if (numberTime === "5:00 PM") {
        num = 68;
      } else if (numberTime === "5:30 PM") {
        num = 70;
      } else if (numberTime === "6:00 PM") {
        num = 72;
      } else if (numberTime === "6:30 PM") {
        num = 74;
      } else if (numberTime === "7:00 PM") {
        num = 76;
      } else if (numberTime === "7:30 PM") {
        num = 78;
      } else if (numberTime === "8:00 PM") {
        num = 80;
      } else if (numberTime === "8:30 PM") {
        num = 82;
      } else if (numberTime === "9:00 PM") {
        num = 84;
      } else if (numberTime === "9:30 PM") {
        num = 86;
      } else if (numberTime === "10:00 PM") {
        num = 88;
      } else if (numberTime === "10:30 PM") {
        num = 90;
      } else if (numberTime === "11:00 PM") {
        num = 92;
      } else if (numberTime === "11:30 PM") {
        num = 94;
      }
      return num;
    }

    let startNum = convertShiftTimes(req.body.timeStart)

    let endNum = convertShiftTimes(req.body.timeEnd)

    for (let i = 0; i < shiftConflict.length; i++) {
      let alreadyExistingStart = convertShiftTimes(shiftConflict[i].timeStart);
      let alreadyExistingEnd = convertShiftTimes(shiftConflict[i].timeEnd);

      if (startNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {

        return res.status(406).send()
      }
      else if (startNum <= alreadyExistingStart && endNum >= alreadyExistingStart) {

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
    shiftDate: req.body.shiftDate,
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
  res.status(201).send()
});



router.post('/employee', async (req, res) => {
  console.log(req.body)
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
  console.log(req.body.shiftDate)
  console.log(req.body.businessId)
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
  const shift = await Shift.findOne({ employeeId: req.body.employeeId, shiftDate: req.body.date })
  const bookings = await Booking.find({ employeeId: req.body.employeeId, date: req.body.date })

  function convertShiftTimes(numberTime) {
    let num = null;
    if (numberTime === "12:00 AM") {
      num = 0;
    } else if (numberTime === "12:30 AM") {
      num = 1;
    } else if (numberTime === "1:00 AM") {
      num = 2;
    } else if (numberTime === "1:30 AM") {
      num = 3;
    } else if (numberTime === "2:00 AM") {
      num = 4;
    } else if (numberTime === "2:30 AM") {
      num = 5;
    } else if (numberTime === "3:00 AM") {
      num = 6;
    } else if (numberTime === "3:30 AM") {
      num = 7;
    } else if (numberTime === "4:00 AM") {
      num = 8;
    } else if (numberTime === "4:30 AM") {
      num = 9;
    } else if (numberTime === "5:00 AM") {
      num = 10;
    } else if (numberTime === "5:30 AM") {
      num = 11;
    } else if (numberTime === "6:00 AM") {
      num = 12;
    } else if (numberTime === "6:30 AM") {
      num = 13;
    } else if (numberTime === "7:00 AM") {
      num = 14;
    } else if (numberTime === "7:30 AM") {
      num = 15;
    } else if (numberTime === "8:00 AM") {
      num = 16;
    } else if (numberTime === "8:30 AM") {
      num = 17;
    } else if (numberTime === "9:00 AM") {
      num = 18;
    } else if (numberTime === "9:30 AM") {
      num = 19;
    } else if (numberTime === "10:00 AM") {
      num = 20;
    } else if (numberTime === "10:30 AM") {
      num = 21;
    } else if (numberTime === "11:00 AM") {
      num = 22;
    } else if (numberTime === "11:30 AM") {
      num = 23;
    } else if (numberTime === "12:00 PM") {
      num = 24;
    } else if (numberTime === "12:30 PM") {
      num = 25;
    } else if (numberTime === "1:00 PM") {
      num = 26;
    } else if (numberTime === "1:30 PM") {
      num = 27;
    } else if (numberTime === "2:00 PM") {
      num = 28;
    } else if (numberTime === "2:30 PM") {
      num = 29;
    } else if (numberTime === "3:00 PM") {
      num = 30;
    } else if (numberTime === "3:30 PM") {
      num = 31;
    } else if (numberTime === "4:00 PM") {
      num = 32;
    } else if (numberTime === "4:30 PM") {
      num = 33;
    } else if (numberTime === "5:00 PM") {
      num = 34;
    } else if (numberTime === "5:30 PM") {
      num = 35;
    } else if (numberTime === "6:00 PM") {
      num = 36;
    } else if (numberTime === "6:30 PM") {
      num = 37;
    } else if (numberTime === "7:00 PM") {
      num = 38;
    } else if (numberTime === "7:30 PM") {
      num = 39;
    } else if (numberTime === "8:00 PM") {
      num = 40;
    } else if (numberTime === "8:30 PM") {
      num = 41;
    } else if (numberTime === "9:00 PM") {
      num = 42;
    } else if (numberTime === "9:30 PM") {
      num = 43;
    } else if (numberTime === "10:00 PM") {
      num = 44;
    } else if (numberTime === "10:30 PM") {
      num = 45;
    } else if (numberTime === "11:00 PM") {
      num = 46;
    } else if (numberTime === "11:30 PM") {
      num = 47;
    }
    return num;
  }

  function shiftCalcTime(num) {
    let time;
    if (num === 0) {
      time = "12:00 AM";
    }
    else if (num === 1) {
      time = "12:30 AM"
    }
    else if (num === 2) {
      time = "1:00 AM"
    }
    else if (num === 3) {
      time = "1:30 AM"
    }
    else if (num === 4) {
      time = "2:00 AM"
    }
    else if (num === 5) {
      time = "2:30 AM"
    }
    else if (num === 6) {
      time = "3:00 AM"
    }
    else if (num === 7) {
      time = "3:30 AM"
    }
    else if (num === 8) {
      time = "4:00 AM"
    }
    else if (num === 9) {
      time = "4:30 AM"
    }
    else if (num === 10) {
      time = "5:00 AM"
    }
    else if (num === 11) {
      time = "5:30 AM"
    }
    else if (num === 12) {
      time = "6:00 AM"
    }
    else if (num === 13) {
      time = "6:30 AM"
    }
    else if (num === 14) {
      time = "7:00 AM"
    }
    else if (num === 15) {
      time = "7:30 AM"
    }
    else if (num === 16) {
      time = "8:00 AM"
    }
    else if (num === 17) {
      time = "8:30 AM"
    }
    else if (num === 18) {
      time = "9:00 AM"
    }
    else if (num === 19) {
      time = "9:30 AM"
    }
    else if (num === 20) {
      time = "10:00 AM"
    }
    else if (num === 21) {
      time = "10:30 AM"
    }
    else if (num === 22) {
      time = "11:00 AM"
    }
    else if (num === 23) {
      time = "11:30 AM"
    }
    if (num === 24) {
      time = "12:00 PM";
    }
    else if (num === 25) {
      time = "12:30 PM"
    }
    else if (num === 26) {
      time = "1:00 PM"
    }
    else if (num === 27) {
      time = "1:30 PM"
    }
    else if (num === 28) {
      time = "2:00 PM"
    }
    else if (num === 29) {
      time = "2:30 PM"
    }
    else if (num === 30) {
      time = "3:00 PM"
    }
    else if (num === 31) {
      time = "3:30 PM"
    }
    else if (num === 32) {
      time = "4:00 PM"
    }
    else if (num === 33) {
      time = "4:30 PM"
    }
    else if (num === 34) {
      time = "5:00 PM"
    }
    else if (num === 35) {
      time = "5:30 PM"
    }
    else if (num === 36) {
      time = "6:00 PM"
    }
    else if (num === 37) {
      time = "6:30 PM"
    }
    else if (num === 38) {
      time = "7:00 PM"
    }
    else if (num === 39) {
      time = "7:30 PM"
    }
    else if (num === 40) {
      time = "8:00 PM"
    }
    else if (num === 41) {
      time = "8:30 PM"
    }
    else if (num === 42) {
      time = "9:00 PM"
    }
    else if (num === 43) {
      time = "9:30 PM"
    }
    else if (num === 44) {
      time = "10:00 PM"
    }
    else if (num === 45) {
      time = "10:30 PM"
    }
    else if (num === 46) {
      time = "11:00 PM"
    }
    else if (num === 47) {
      time = "11:30 PM"
    }
    else if (num === 48) {
      time = "12:00 AM"
    }
    else if (num === 49) {
      time = "12:30 AM"
    }
    else if (num === 50) {
      time = "1:00 AM"
    }
    else if (num === 51) {
      time = "1:30 AM"
    }
    else if (num === 52) {
      time = "2:00 AM"
    }
    else if (num === 53) {
      time = "2:30 AM"
    }
    else if (num === 54) {
      time = "3:00 AM"
    }
    else if (num === 55) {
      time = "3:30 AM"
    }
    else if (num === 56) {
      time = "4:00 AM"
    }
    else if (num === 57) {
      time = "4:30 AM"
    }
    else if (num === 58) {
      time = "5:00 AM"
    }
    else if (num === 59) {
      time = "5:30 AM"
    }
    else if (num === 60) {
      time = "6:00 AM"
    }
    else if (num === 61) {
      time = "6:30 AM"
    }
    else if (num === 62) {
      time = "7:00 AM"
    }
    else if (num === 63) {
      time = "7:30 AM"
    }
    else if (num === 64) {
      time = "8:00 AM"
    }
    else if (num === 65) {
      time = "8:30 AM"
    }
    else if (num === 66) {
      time = "9:00 AM"
    }
    else if (num === 67) {
      time = "9:30 AM"
    }
    else if (num === 68) {
      time = "10:00 AM"
    }
    else if (num === 69) {
      time = "10:30 AM"
    }
    else if (num === 70) {
      time = "11:00 AM"
    }
    else if (num === 71) {
      time = "11:30 AM"
    }
    return time
  }
  console.log(shift, "dwdw")
  if (shift) {
    let times = [];
    console.log(shift.timeStart)
    console.log(convertShiftTimes(shift.timeStart))

    for (let i = convertShiftTimes(shift.timeStart); i < convertShiftTimes(shift.timeEnd); i++) {
      console.log(i)
      times.push(shiftCalcTime(i))
    }
    console.log(times)
  }
})




module.exports = router;