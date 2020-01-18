const express = require('express');
const router = express.Router();
const Employee = require('../../models/Employee');
const instructorAuth = require('../../middleware/authInstructor')

router.get('/', instructorAuth, async (req, res) => {
    console.log(req.employee)
    const employee = await Employee.findOne({_id: req.employee.id});
    console.log(employee)
    const employeeId = employee.id;
    console.log(employeeId)
    res.status(200).json({employeeId})
})

module.exports = router;