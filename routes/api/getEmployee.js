const express = require('express');
const router = express.Router();
const Employee = require('../../models/Employee');
const employeeAuth = require('../../middleware/authEmployee')

router.get('/', employeeAuth, async (req, res) => {
    const employee = await Employee.findOne({ _id: req.employee.id }).select(['business', 'businessWorkingAt', '_id']);
    res.status(200).json({ employee })
})

module.exports = router;