const router = require('express').Router();
const ServiceType = require('../../models/ServiceType')
const BusinessProfile = require('../../models/BusinessProfile');


router.post('/', async (req, res) => {
    console.log(req.body)
    if (req.body.serviceTypesArray.length > 0) {
        let serviceTypesArray = [];
        for (let i = 0; i < req.body.serviceTypesArray.length; i++) {
            let serviceType = await ServiceType.findOne({_id: req.body.serviceTypesArray[i]})
            if (serviceType) {       
            serviceTypesArray.push(serviceType)
        }
    }
        
        if (serviceTypesArray.length > 0) {
            res.status(200).json({serviceTypesArray})
        }
        else {
            res.status(204).send();
        }
    }
})

router.post('/delete', async(req, res) => {
    
    const businessProfile = await BusinessProfile.findOne({business: req.body.businessId})
    businessProfile.serviceTypes = businessProfile.serviceTypes.filter(serviceType => {
        req.body.deletedServices.forEach(deletedServiceId => {
            return deletedServiceId !== serviceType
        })
    })
    businessProfile.save();

    for (let i = 0; i < req.body.deletedServices.length; i++) {
        console.log(req.body.deletedServices[i])
       await ServiceType.deleteOne({_id: req.body.deletedServices[i]})
    }
    res.status(200).send()
})

module.exports = router;