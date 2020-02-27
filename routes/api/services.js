const router = require('express').Router();
const adminAuth = require('../../middleware/authAdmin')
const BusinessProfile = require('../../models/BusinessProfile')
const ServiceType = require('../../models/ServiceType');


router.post('/create', adminAuth, async (req, res) => {
    let businessProfile = await BusinessProfile.findOne({business: req.admin.businessId});
    if (businessProfile) {
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
      }
      else {
        let newServiceType = new ServiceType({
          cost: req.body.cost,
          serviceName: req.body.serviceName,
          timeDuration: req.body.timeDuration
        })
        await newServiceType.save();
        let newBusinessProfile = new BusinessProfile({
          business: req.admin.businessId,
          serviceTypes: [newServiceType]
        })
        await newBusinessProfile.save();
        res.status(201).json({newServiceType});
      }
})

module.exports = router;
