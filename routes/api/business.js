const router = require('express').Router();
const Business = require('../../models/Business');
const BusinessProfile = require('../../models/BusinessProfile');
const Employee = require('../../models/Employee');
const ServiceType = require('../../models/ServiceType');
const authAdmin = require('../../middleware/authAdmin');
const utils = require('../../utils/utils');
const Booking = require('../../models/Booking');


router.post('/bct', async (req, res) => {
    let business = await Business.findById({ _id: req.body.id }).select(["bookingColumnType", 'schedule', "bookingColumnNumber"]);
    if (business) {
        let bct = business.bookingColumnType;
        let schedule = business.schedule;
        let bcn = business.bookingColumnNumber;
        res.status(200).json({ bct, schedule, bcn })
    }
})

router.get("/", authAdmin, async (req, res) => {
    const business = await Business.findOne({ _id: req.admin.businessId }).select(['businessName', 'address', "city", "zip", "state"]);
    if (business) {
        res.status(200).json({ business })
    }
    else {
        res.status(404);
    }
})

// 856 266 6214
// 856 669 8219
// 856 834 5502

router.post("/employeePerformance", authAdmin, async (req, res) => {
    const businessProfile = await BusinessProfile.findOne({ business: req.admin.businessId });
    const startDay = new Date(req.body.startDay);
    const endDay = new Date(req.body.endDay);
    const days = (endDay - startDay) / 24 / 60 / 60 / 1000;
    const dayFloor = Math.floor(days);
    if (dayFloor < 0) {
        return res.status(409).send()
    }
    let bookings = [];
    for (let i = 0; i <= dayFloor; i++) {
        const dateAdded = new Date(startDay.getFullYear(), startDay.getMonth(), (startDay.getDate() + i)).toDateString();
        const bookingsForDates = await Booking.find({ date: dateAdded, businessId: req.admin.businessId });
        bookings.push(...bookingsForDates);
    }
    const finalArray = [];
    console.log(businessProfile)
    for (let otherIndex = 0; otherIndex < businessProfile.employeesWhoAccepted.length; otherIndex++) {
        const employee = await Employee.findOne({ _id: businessProfile.employeesWhoAccepted[otherIndex] });
        const newObject = { employeeName: employee.fullName, employeeId: employee._id }
        let earningsForThisEmployee = 0;
        for (let otherOtherIndex = 0; otherOtherIndex < bookings.length; otherOtherIndex++) {
            console.log(bookings[otherOtherIndex].employeeBooked.toString() == employee._id.toString())
            if (bookings[otherOtherIndex].employeeBooked.toString() == employee._id.toString()) {
                console.log("yes")
                let costForBookingArray = bookings[otherOtherIndex].cost.split("");
                delete costForBookingArray[0];
                let correctCost = parseInt(costForBookingArray.join(""));
                earningsForThisEmployee += correctCost;
            }
        }
        newObject.employeeEarnings = "$" + earningsForThisEmployee.toFixed(2);
        let serviceAmountPerDay = earningsForThisEmployee / (dayFloor + 1);
        console.log(serviceAmountPerDay);
        let correctAmount = serviceAmountPerDay.toFixed(2).toString();
        let amountSendingBack = "$" + correctAmount;
        newObject.realAmountPerDay = amountSendingBack;
        finalArray.push(newObject);
    }
    console.log(finalArray);
    res.status(200).json({ data: finalArray });
})

router.post("/performance", authAdmin, async (req, res) => {
    console.log("anything")
    console.log(req.admin)
    const startDay = new Date(req.body.startDay);
    const endDay = new Date(req.body.endDay);
    const days = (endDay - startDay) / 24 / 60 / 60 / 1000;
    let dayFloor = Math.floor(days);
    if (dayFloor < 0) {
        return res.status(409).send()
    }
    const bookings = [];
    for (let i = 0; i <= dayFloor; i++) {
        const dateAdded = new Date(startDay.getFullYear(), startDay.getMonth(), (startDay.getDate() + i)).toDateString();
        const bookingsForDate = await Booking.find({ date: dateAdded, businessId: req.admin.businessId });
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
    console.log(serviceCount / dayFloor)
    let spd = (serviceCount / dayFloor).toFixed(2);
    console.log(spd)
    res.status(200).json({ mp: moneyPerformance, sc: serviceCount.toString(), spd: spd.toString(), ipd });
})


router.post('/', async (req, res) => {
    const business = await Business.findOne({ _id: req.body.businessId }).select(['schedule', 'businessName', 'bookingColumnType', 'typeOfBusiness', 'address', 'city', 'zip', 'state', 'bookingColumnNumber', 'website', 'phoneNumber']);
    const profile = await BusinessProfile.findOne({ business: req.body.businessId })
    if (profile && business) {
        let employees = await Employee.find({ _id: profile.employeesWhoAccepted }).select(['_id', "fullName"]);
        res.status(200).json({ business, profile, employees })
    } else if (!profile && business) {
        res.status(206).json({ message: "No" });
    }
    else {
        res.status(406).json({ message: "No" })
    }
})

router.post('/appBusiness', async (req, res) => {
    try {
        const business = await Business.findOne({ _id: req.body.businessId }).select(['schedule', 'businessName', 'bookingColumnType', 'typeOfBusiness', 'address', 'city', 'zip', 'state', 'bookingColumnNumber', 'website', 'phoneNumber', "eq"]);
        const profile = await BusinessProfile.findOne({ business: req.body.businessId }).select(["serviceTypes"]);
        if (profile) {
            let services = await ServiceType.find({ _id: profile.serviceTypes });
            res.status(200).json({ business, services: services })
        }
        else {
            if (business) {
                res.status(200).json({ business })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

router.post("/startEndTime", authAdmin, async (req, res) => {
    const date = new Date(req.body.date).toDateString();
    console.log(req.admin)
    const business = await Business.findOne({ _id: req.admin.businessId }).select(["schedule"]);
    const dateSplit = date.split(" ");
    const day = dateSplit[0];
    let open = "";
    let close = "";
    if (day === "Sun") {
        open = business.schedule[0].open;
        close = business.schedule[0].close;
    }
    else if (day === "Mon") {
        open = business.schedule[1].open;
        close = business.schedule[1].close;
    } else if (day === "Tue") {
        open = business.schedule[2].open;
        close = business.schedule[2].close;
    } else if (day === "Wed") {
        open = business.schedule[3].open;
        close = business.schedule[3].close;
    } else if (day === "Thu") {
        open = business.schedule[4].open;
        close = business.schedule[4].close;
    } else if (day === "Fri") {
        open = business.schedule[5].open;
        close = business.schedule[5].close;
    } else if (day === "Sat") {
        open = business.schedule[6].open;
        close = business.schedule[6].close;
    }
    const openNum = utils.stringToIntTime[open];
    const closeNum = utils.stringToIntTime[close];
    res.status(200).json({ open: openNum, close: closeNum });
})

router.post('/businessschedule', async (req, res) => {
    const businessForEmployees = await BusinessProfile.findOne({ business: req.body.businessId }).select(['employeesWhoAccepted']);
    const employees = await Employee.find({ _id: businessForEmployees.employeesWhoAccepted }).select(['fullName', '_id'])
    const businessSchedule = await Business.findOne({ _id: req.body.businessId }).select(['schedule', 'bookingColumnType', 'bookingColumnNumber']);
    if (businessSchedule) {
        res.status(200).json({
            employees, schedule: businessSchedule.schedule, bookingColumnsType: businessSchedule.bookingColumnType,
            bookingColumnNumber: businessSchedule.bookingColumnNumber
        })
    }

})

module.exports = router;