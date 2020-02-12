const router = require('express').Router();
const Shift = require('../../models/Shift')

router.post('/create', async (req, res) => {

    const shiftConflict = await Shift.find({employeeName: req.body.employeeName, shiftDate: req.body.shiftDate, employeeName: req.body.employeeName})

    if (shiftConflict.length > 0) {

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
              return res.status(406).send()
          }
          else if (endNum >= alreadyExistingStart && endNum <= alreadyExistingEnd) {
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
        breakStart: req.body.breakStart
    })

    await newShift.save();
    res.status(200).json({newShift})
});

router.post('/get', async (req, res) => {
    const shifts = await Shift.find({shiftDate: req.body.shiftDate, businessId: req.body.businessId})
    if (shifts.length > 0) {
        res.status(200).json({shifts})
    }
    else {
        res.status(204).send();
    }
})


module.exports = router;