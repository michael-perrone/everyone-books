const router = require('express').Router();
const adminAuth = require('../../middleware/authAdmin')
const BusinessProfile = require('../../models/BusinessProfile')


router.post('/create', adminAuth, async (req, res) => {
    let businessProfile = await BusinessProfile.findOne({business: req.admin.businessId});

    const servicesArray = businessProfile ? [...businessProfile.serviceTypes] : []

    if (req.body.service) {
        let newServiceType = new ServiceType({
          cost: req.body.service.cost,
          serviceName: req.body.service.serviceName,
          timeDuration: req.body.service.timeDuration
        })
        await newServiceType.save();
        servicesArray.push(newServiceType._id);
        businessProfile.serviceTypes = servicesArray;
        await businessProfile.save();
    }
})

module.exports = router;
