const router = require('express').Router();
const Employee = require('../../models/Employee');
const Shift = require('../../models/Shift');


router.post('/dates', async (req, res) => {
    console.log(req.body)
    const shifts = await Shift.find({businessId: req.body.businessId, shiftDate: req.body.date });
    console.log(shifts)
    let availableEmployees = []
    console.log(shifts)
    if (shifts) {
    for (let i = 0; i < shifts.length; i++) {
        let employee = await Employee.findOne({_id: shifts[i].employeeId}).select(['fullName', "_id",])
        console.log(employee)
        availableEmployees.push(employee)
    }
    res.status(200).json({availableEmployees})
    }
    else {
        res.status(200).json({availableEmployees: []})
    }
})

module.exports = router;