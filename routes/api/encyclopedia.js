const express = require('express');
const router = express.Router();
const Service = require('../../models/ServiceType');
const Product = require('../../models/Product');
const BusinessProfile = require('../../models/BusinessProfile');
const Business = require('../../models/Business');

router.post('/services', async function(req, res) {
    try {
        const services = await Service.find({}).select(["cost", "serviceName"]);
        const servicesThatMatch = [];
        for (let i = 0; i < services.length; i++) {
            if (services[i].serviceName.toLowerCase().includes(req.body.text.toLowerCase())) {
                if (servicesThatMatch.length < 12) {
                    servicesThatMatch.push(services[i]);
                }
            }
        }
        const servicesPlusBusiness = [];
        for (let i = 0; i < servicesThatMatch.length; i++) {
            console.log(servicesThatMatch);
            const bp = await BusinessProfile.findOne({serviceTypes: servicesThatMatch[i]._id}).select(['business']);
            console.log(bp)
            const business = await Business.findOne({_id: bp.business}).select(['businessName']);
            console.log(business);
            servicesPlusBusiness.push({business, service: servicesThatMatch[i]});
        }
        if (servicesPlusBusiness.length > 0) {
            res.status(200).json({services: servicesPlusBusiness});
        }
        else {
            res.status(406).send();
        }
    } catch(error) {
        console.log(error);
        res.status(406).send();
    }
})

// router.post('/services', async function(req, res) {
//     const services = await Service.find({}).select(["cost", "serviceName"]);
//     const servicesToSendBack = [];
//     for (let i = 0; i < services.length; i++) {
//         if (services[i].serviceName.contains(req.body.text)) {
//             if (servicesToSendBack.length < 12) {
//                 servicesToSendBack.push(services[i]);
//             }
//         }
//     }
//     if (servicesToSendBack.length > 0) {
//         res.status(200).json({servicesToSendBack});
//     }
//     else {
//         res.status(406).send();
//     }
// })


module.exports = router;