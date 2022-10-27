const express = require('express');
const router = express.Router();
const Employee = require('../../models/Employee');
const employeeAuth = require('../../middleware/authEmployee');
const Notification = require("../../models/Notification");
const Admin = require('../../models/Admin');

router.get('/', employeeAuth, async (req, res) => {
    const employee = await Employee.findOne({ _id: req.employee.id }).select(['business', 'businessWorkingAt', '_id']);
    res.status(200).json({ employee })
})

router.post('/cancelRequest', employeeAuth, async (req, res) => {
    const noti = await Notification.findOne({fromId: req.employee.id, type: "ESID"});
    const employee = await Employee.findOne({_id: req.employee.id}).select(["idsSent"]);
    employee.idsSent = 0;
    await employee.save();
    await noti.deleteOne();
    res.status(200).send();
})


router.get('/idsSent', employeeAuth, async (req, res) => {
    console.log("YOOOOOOOO");
    const employee = await Employee.findOne({_id: req.employee.id}).select(["idsSent"]);
    if (employee.idsSent) {
        const noti = await Notification.findOne({fromId: req.employee.id, type: "ESID"});
        if (noti) {
            const admin = await Admin.findOne({notifications: noti._id});
            res.status(200).json({bId: admin.business});
        }
    }
    res.status(406).send();
})

module.exports = router;