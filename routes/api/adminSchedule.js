const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/authAdmin');
const Business = require('../../models/Business');
const Shift = require('../../models/Shift');
const Booking = require('../../models/Booking');
const utils = require('../../utils/utils');
const Group = require("../../models/Group");
const BusinessProfile = require("../../models/BusinessProfile");
const Product = require('../../models/Product');

router.post('/', adminAuth, async (req, res) => {
    try {
        const date = new Date(req.body.date).toDateString();
        const business = await Business.findOne({ _id: req.admin.businessId });
        const groups = await Group.find({businessId: business._id, date: date});
        console.log(groups)
        const bookings = await Booking.find({ businessId: business._id, date: date });
        var num;
        let day = date.split(" ")[0];
        if (day === "Sun") {
            num = 0;
        }
        else if (day === "Mon") {
            num = 1;
        }
        else if (day === "Tue") {
            num = 2;
        }
        else if (day === "Wed") {
            num = 3;
        }
        else if (day === "Thu") {
            num = 4;
        }
        else if (day === "Fri") {
            num = 5;
        }
        else if (day === "Sat") {
            num = 6;
        }
        const bp = await BusinessProfile.findOne({business: business._id});
        let products = []
        if (bp) {
            products = await Product.find({_id: bp.products});
        }
        if (business.schedule[num].open === "Closed" || business.schedule[num].close === "Closed") {
          return res.status(202).json({eq: business.eq, bcn: business.bookingColumnNumber, bct: business.bookingColumnType, products});
        }
        res.status(200).json({
            bookings, bcn: business.bookingColumnNumber, bct: business.bookingColumnType,
            open: business.schedule[num].open, close: business.schedule[num].close,
            groups: groups, eq: business.eq, products
        });
    }
    catch (error) {
        console.log(error)
    }
})



module.exports = router;