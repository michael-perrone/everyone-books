const router = require('express').Router();
const adminAuth = require('../../middleware/authAdmin')
const BusinessProfile = require('../../models/BusinessProfile')
const ServiceType = require('../../models/ServiceType');


router.post('/create', adminAuth, async (req, res) => {
    console.log(req.body)
    let businessProfile = await BusinessProfile.findOne({business: req.admin.businessId});
    const servicesArray = businessProfile ? [...businessProfile.serviceTypes] : []
        let newServiceType = new ServiceType({
          cost: req.body.cost,
          serviceName: req.body.serviceName,
          timeDuration: req.body.timeDuration
        })
        await newServiceType.save();
        servicesArray.push(newServiceType._id);
        businessProfile.serviceTypes = servicesArray;
        await businessProfile.save();
    res.status(200).json({newServiceType})

})

module.exports = router;
