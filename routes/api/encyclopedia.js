const express = require('express');
const router = express.Router();
const Service = require('../../models/ServiceType');
const Product = require('../../models/Product');

router.post('/services', async function(req, res) {
    const services = await Service.find({}).select(["cost", "serviceName"]);
    const servicesToSendBack = [];
    for (let i = 0; i < services.length; i++) {
        if (services[i].serviceName.toLowerCase().includes(req.body.text.toLowerCase())) {
            if (servicesToSendBack.length < 12) {
                servicesToSendBack.push(services[i]);
            }
        }
    }
    if (servicesToSendBack.length > 0) {
        res.status(200).json({services: servicesToSendBack});
    }
    else {
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