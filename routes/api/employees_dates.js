const router = require('express').Router();
const Employee = require('../../models/Employee');
const Shift = require('../../models/Shift');


router.post('/dates', async (req, res) => {
    const shifts = await Shift.find({businessId: req.body.businessId, shiftDate: req.body.date });
    let availableEmployees = []
    if (shifts) {
    for (let i = 0; i < shifts.length; i++) {
        let employee = await Employee.findOne({_id: shifts[i].employeeId}).select(['fullName', "_id",])
        let doublesArray = []
        for (let z = 0; z < availableEmployees.length; z++) {
            if (availableEmployees[z]._id === employee._id) {
                doublesArray.push(employee._id);
            }
        }
        if (availableEmployees.find(num => num._id.toString() === employee._id.toString())) {
            console.log('dup')
        }
        else {
            availableEmployees.push(employee)
        }
    }
    res.status(200).json({availableEmployees})
    }
    else {
        res.status(200).json({availableEmployees: []})
    }
})

module.exports = router;