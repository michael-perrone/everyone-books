const router = require('express').Router();
const adminAuth = require('../../middleware/authAdmin')
const BusinessProfile = require('../../models/BusinessProfile')
const ServiceType = require('../../models/ServiceType');
const Product = require('../../models/Product');
const employeeAuth = require("../../middleware/authEmployee");

router.get("/getServicesAndProducts", employeeAuth, async (req, res) => {
  const businessProfile = await BusinessProfile.findOne({business: req.employee.businessId});
  if (businessProfile) {
    let serviceTypes = await ServiceType.find({ _id: businessProfile.serviceTypes });
    let products = await Product.find({_id: businessProfile.products});
    return res.status(200).json({ services: serviceTypes, products });
  }
  else {
    return res.status(406).send();
  }
})


router.get('/', adminAuth, async (req, res) => {
  try {
    let businessProfile = await BusinessProfile.findOne({ business: req.admin.businessId }).select(["serviceTypes"]);
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

router.post("/getServices", async (req, res) => {
  try {
    console.log(req.body, "IM THE BODY");
    let businessProfile = await BusinessProfile.findOne({ business: req.body.businessId}).select(["serviceTypes"]);
    if (businessProfile) {
      console.log(businessProfile);
      let serviceTypes = await ServiceType.find({ _id: businessProfile.serviceTypes });
      res.status(200).json({ services: serviceTypes });
    }
    else {
      res.status(204).send()
    }
  }
  catch (error) {
    console.log(error)
  }
})


router.post('/delete', adminAuth, async (req, res) => {
  try {
    let businessProfile = await BusinessProfile.findOne({ business: req.admin.businessId });
    console.log(req.body.serviceId)
    businessProfile.serviceTypes = businessProfile.serviceTypes.filter(serviceType => {
      return req.body.serviceId.toString() !== serviceType.toString()
    });
    await businessProfile.save();
    res.status(200).json({ serviceTypes: businessProfile.serviceTypes })
  }
  catch (error) {
    console.log(error)
  }
})

router.post('/create', adminAuth, async (req, res) => {1
  let businessProfile = await BusinessProfile.findOne({ business: req.admin.businessId });
  if (businessProfile) {
    const servicesArray = businessProfile ? [...businessProfile.serviceTypes] : []
    let newServiceType = new ServiceType({
      requiresEmployee: req.body.requiresEmployee,
      cost: req.body.cost,
      serviceName: req.body.serviceName,
      timeDuration: req.body.timeDuration
    })
    await newServiceType.save();
    servicesArray.push(newServiceType._id);
    businessProfile.serviceTypes = servicesArray;
    await businessProfile.save();
    res.status(200).json({ newServiceType })
  }
  else {
    let newServiceType = new ServiceType({
      requiresEmployee: req.body.requiresEmployee,
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
