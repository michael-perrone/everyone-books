const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/authAdmin');
const Business = require('../../models/Business');
const Shift = require('../../models/Shift');
const Booking = require('../../models/Booking');
const utils = require('../../utils/utils');

router.post('/', adminAuth, async (req, res) => {
    try {
        const date = new Date(req.body.date).toDateString();
        const business = await Business.findOne({ _id: req.admin.businessId });
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
        res.status(200).json({
            bookings, bcn: business.bookingColumnNumber, bct: business.bookingColumnType,
            open: business.schedule[num].open, close: business.schedule[num].close
        });
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router;