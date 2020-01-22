const router = require('express').Router();
const Business = require('../../models/Business');
const BusinessProfile = require('../../models/BusinessProfile');
const Employee = require('../../models/Employee');


router.post('/', async (req, res) => {
    const business = await Business.findOne({_id: req.body.businessId}).select(['schedule', 'businessName', 'bookingColumnType', 'typeOfBusiness', 'address', 'city', 'zip', 'state', 'bookingColumnNumber', 'website', 'phoneNumber']);
    const profile = await BusinessProfile.findOne({business: req.body.businessId})
    if (profile && business) {
       let employees = await Employee.find({_id: profile.employeesWhoAccepted}).select(['_id', "fullName"]);
        res.status(200).json({business, profile, employees})
    } else if (!profile && business){
        res.status(206).json({message: "This business has no profile created."})
    }
    else {
        res.status(406).json({message: "This business does not exist yet."})
    }
})

module.exports = router;