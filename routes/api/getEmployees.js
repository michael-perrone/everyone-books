const router = require('express').Router();
const adminAuth = require('../../middleware/authAdmin');
const Employee = require('../../models/Employee');
const BusinessProfile = require('../../models/BusinessProfile');
const Business = require('../../models/Business');



router.get('/', adminAuth, async (req, res) => {
    const business = await BusinessProfile.findOne({ business: req.admin.businessId }).select(['employeesWhoAccepted']);
    if (business) {
        if (business.employeesWhoAccepted) {
            const employees = await Employee.find({ _id: business.employeesWhoAccepted }).select(['fullName', "_id"]);
            if (employees) {
                res.status(200).json({ employees });
            }
        }
        else {
            res.status(204).send();
        }
    }
    else {
        return res.status(406).send();
    }
})


router.get('/plusBcn', adminAuth, async (req, res) => {
    const business = await BusinessProfile.findOne({ business: req.admin.businessId }).select(['employeesWhoAccepted']);
    const realB = await Business.findOne({_id: req.admin.businessId}).select(["bookingColumnNumber", "bookingColumnType"]);
    if (business) {
        if (business.employeesWhoAccepted) {
            const employees = await Employee.find({ _id: business.employeesWhoAccepted }).select(['fullName', "_id"]);
            if (employees) {
                res.status(200).json({ employees, bcn: realB.bookingColumnNumber, bct: realB.bookingColumnType });
            }
        }
        else {
            res.status(206).json({bcn: realB.bookingColumnNumber, bct: realB.bookingColumnType });
        }
    }
    else if (realB) {
        res.status(206).json({bcn: realB.bookingColumnNumber, bct: realB.bookingColumnType});
    }
    else {
        return res.status(406).send();
    }
})


module.exports = router;