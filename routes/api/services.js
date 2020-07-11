const router = require('express').Router();
const adminAuth = require('../../middleware/authAdmin')
const BusinessProfile = require('../../models/BusinessProfile')
const ServiceType = require('../../models/ServiceType');


router.get('/', adminAuth, async (req, res) => {
  try {
    console.log("hi")
    let businessProfile = await BusinessProfile.findOne({ business: req.admin.businessId });
    console.log(businessProfile)
    if (businessProfile) {
      let serviceTypes = await ServiceType.find({ _id: businessProfile.serviceTypes });
      res.status(200).json({ services: serviceTypes });
    }
    else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
})

router.post('/delete', adminAuth, async (req, res) => {
  try {
    let businessProfile = await BusinessProfile.findOne({ business: req.admin.businessId });
    businessProfile.serviceTypes = businessProfile.serviceTypes.filter(serviceType => {
      return !req.body.removing.includes(serviceType.toString());
    });
    await businessProfile.save();
    res.status(200).json({ serviceTypes: businessProfile.serviceTypes })
  }
  catch (error) {
    console.log(error)
  }
})

router.post('/create', adminAuth, async (req, res) => {
  console.log("hi")
  let businessProfile = await BusinessProfile.findOne({ business: req.admin.businessId });
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
    console.log("hi")
    res.status(200).json({ newServiceType })
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
    res.status(201).json({ newServiceType });
  }
})

module.exports = router;
