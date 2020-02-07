const router = require('express').Router();
const Shift = require('../../models/Shift')

router.post('/create', async (req, res) => {
    const newShift = new Shift({
        shiftDate: req.body.shiftDate,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        shiftDuration: req.body.shiftDuration,
        businessId: req.body.businessId
    })

    await newShift.save();
});

module.exports = router;