const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/authAdmin");
const Advertisement = require("../../models/Advertisement");
const Business = require('../../models/Business');


router.post('/create', adminAuth, async (req, res) => {
    const ad = new Advertisement({
        adHeader: req.body.adHeader,
        adDetails: req.body.adDetails,
        target: req.body.target
    })
    const business = await Business.findOne({_id: req.admin.businessId});
    const businessAds = [...business.advertisements];
    businessAds.push(ad);
    business.advertisements = businessAds;
    await business.save();
    await ad.save();
    res.status(200).send();
});

router.get("/", adminAuth, async (req, res) => {
    const business = await Business.findOne({_id: req.admin.businessId});
    const ads = await Advertisement.find({_id: business.advertisements});
    if (ads.length) {
        res.status(200).json({ads});
    }
    else {
        res.status(204).send();
    }
})



module.exports = router;