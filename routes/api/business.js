const router = require('express').Router();
const Business = require('../../models/Business');
const BusinessProfile = require('../../models/BusinessProfile');
const Employee = require('../../models/Employee');
const ServiceType = require('../../models/ServiceType');
const authAdmin = require('../../middleware/authAdmin');
const utils = require('../../utils/utils');


router.post('/bct', async (req, res) => {
    let business = await Business.findById({ _id: req.body.id }).select(["bookingColumnType", 'schedule', "bookingColumnNumber"]);
    if (business) {
        let bct = business.bookingColumnType;
        let schedule = business.schedule;
        let bcn = business.bookingColumnNumber;
        res.status(200).json({ bct, schedule, bcn })
    }
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
        const business = await Business.findOne({ _id: req.body.businessId }).select(['schedule', 'businessName', 'bookingColumnType', 'typeOfBusiness', 'address', 'city', 'zip', 'state', 'bookingColumnNumber', 'website', 'phoneNumber']);
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