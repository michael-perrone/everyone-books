const router = require('express').Router();
const adminAuth = require('../../middleware/authAdmin');
const Employee = require('../../models/Employee');
const BusinessProfile = require('../../models/BusinessProfile');



router.get('/', adminAuth, async (req, res) => {
    const business = await BusinessProfile.findOne({business: req.admin.businessId}).select(['employeesWhoAccepted']);
    const employees = await Employee.find({_id: business.employeesWhoAccepted}).select(['fullName', "_id"]);
    if (employees) {
        res.status(200).json({employees})
    }
})

module.exports = router;