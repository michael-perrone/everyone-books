const express = require("express");
const router = express.Router();
const authEmployee = require("../../middleware/authEmployee");
const Admin = require("../../models/Admin");
const Business = require("../../models/Business");
const BusinessProfile = require("../../models/BusinessProfile");
const Employee = require("../../models/Employee");
const Booking = require('../../models/Booking');
const utils = require("../../utils/utils");


router.get("/getBusinesses", authEmployee, async (req, res) => {
    let employee = await Employee.findOne({ _id: req.employee.id });
    let business = await Business.findOne({ _id: employee.businessWorkingAt }).select(["businessName"]);
    if (business) {
        console.log("anything")
        res.status(200).json({ business });
    }
    else {
        res.status(204).send();
    }
});

router.post("/performance", authEmployee, async (req, res) => {

    const startDay = new Date(req.body.startDay);
    const endDay = new Date(req.body.endDay);
    const days = (endDay - startDay) / 24 / 60 / 60 / 1000;
    let dayFloor = Math.floor(days);
    if (dayFloor < 0) {
        return res.status(409).send()
    }
    let employee = await Employee.findOne({ _id: req.employee.id });
    let bookings = [];
    for (let i = 0; i <= dayFloor; i++) {
        const dateAdded = new Date(startDay.getFullYear(), startDay.getMonth(), (startDay.getDate() + i)).toDateString();
        const bookingsForDate = await Booking.find({ date: dateAdded, employeeBooked: req.employee.id });
        bookings.push(...bookingsForDate)
    }
    let moneyPerformance = 0;
    for (let c = 0; c < bookings.length; c++) {
        let costWithDollarSignArray = bookings[c].cost.split("");
        costWithDollarSignArray.shift();
        let costWithoutDollarSign = Number(costWithDollarSignArray.join(""));
        moneyPerformance += costWithoutDollarSign;
    }
    dayFloor = dayFloor + 1;
    const ipd = "$" + (moneyPerformance / dayFloor).toFixed(2);
    moneyPerformance = "$" + moneyPerformance.toString();
    let serviceCount = 0;
    for (let bookingsIndex = 0; bookingsIndex < bookings.length; bookingsIndex++) {
        serviceCount += bookings[bookingsIndex].serviceType.length;
    }
    let spd = (serviceCount / dayFloor).toFixed(2);
    console.log(spd)
    res.status(200).json({ mp: moneyPerformance, sc: serviceCount.toString(), spd: spd.toString(), ipd });
})

router.post("/leaveBusiness", authEmployee, async (req, res) => {
    let date = new Date();
    try {
        let employee = await Employee.findOne({ _id: req.employee.id });
        let businessProfile = await BusinessProfile.findOne({ business: req.body.bId });
        let newEmployees = businessProfile.employeesWhoAccepted.filter(e => e.toString() !== req.employee.id.toString());
        let leftNoti = new Notification({
            date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
            fromString: req.employee.fullName,
            type: "ELB"
        });
        let admin = await Admin.findOne({ business: req.body.bId });
        admin.notifications.push(leftNoti);
        businessProfile.employeesWhoAccepted = newEmployees;
        employee.business = "None";
        employee.businessWorkingAt = null;
        await leftNoti.save();
        await businessProfile.save();
        await employee.save();
        await admin.save()
        console.log(employee)
        res.status(200).send();
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;