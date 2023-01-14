const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/authAdmin");
const Advertisement = require("../../models/Advertisement");
const Business = require('../../models/Business');


router.post('/create', adminAuth, async (req, res) => {
    const ad = new Advertisement({
        adHeader: req.body.adHeader,
        adDetails: req.body.adDetails,
        target: req.body.target === "Potential Customers" ? "C" : "E"
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

router.post("/getRandom", async (req, res) => {
    const ads = await Advertisement.find({target: "C"}, null, {limit: req.body.limit});
    return res.status(200).json({ads});
})

router.post("/getRandomE", async (req, res) => {
    const ads = await Advertisement.find({target: "E"}, null, {limit: req.body.limit});
    return res.status(200).json({ads});
})

router.post("/goToBusiness", async (req, res) => {
    const business = await Business.findOne({advertisements: req.body.id})
    if (business) {
        return res.status(200).json({bId: business._id});
    }
})



module.exports = router;