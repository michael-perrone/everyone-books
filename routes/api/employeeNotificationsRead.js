const express = require('express');
const Employee = require('../../models/Employee');
const Notification = require('../../models/Notification');


module.exports = express.Router().post('/', async (req, res) => {
    try {
    let employee = await Employee.findOne({_id: req.body.id});
    let notificationsForEmployee = await Notification.find({employeeId: employee._id})
    for (let i = 0; i < notificationsForEmployee.length; i++) {
        notificationsForEmployee[i].notificationRead = true;
        await notificationsForEmployee[i].save()
    }
    res.status(200).send()
}  catch(error) {
    console.log(error)
    res.status(500).send()
}
})

