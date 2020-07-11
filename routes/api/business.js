const router = require('express').Router();
const Business = require('../../models/Business');
const BusinessProfile = require('../../models/BusinessProfile');
const Employee = require('../../models/Employee');
const ServiceType = require('../../models/ServiceType');


router.post('/bct', async (req, res) => {
    let business = await Business.findById({ _id: req.body.id }).select(["bookingColumnType"]);
    if (business) {
        let bct = business.bookingColumnType;
        res.status(200).json({ bct })
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