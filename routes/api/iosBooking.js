const express = require("express");
const Booking = require("../../models/Booking");
const router = express.Router();
const userAuth = require('../../middleware/authUser');
const ServiceType = require("../../models/ServiceType");
const utils = require("../../utils/utils");
const Employee = require("../../models/Employee");
const Shift = require("../../models/Shift");
const User = require("../../models/User");

router.post("/admin", async (req, res) => {
    try {
        const date = utils.getStringDateTime(req.body.timeStart, req.body.date);
        let customer;
        if (req.body.phone && req.body.phone !== "") {
            let phoneArray = req.body.phone.split("");
            console.log(phoneArray)
            for (let i = 0; i < phoneArray.length; i++) {
                if (phoneArray[i] !== "0" && phoneArray[i] !== "1" && phoneArray[i] !== "2" && phoneArray[i] !== "3" && phoneArray[i] !== "4" && phoneArray[i] !== "5" && phoneArray[i] !== "6" && phoneArray[i] !== "7" && phoneArray[i] !== "8" && phoneArray[i] !== "9") {
                    delete phoneArray[i];
                }
            }
            let realPhone = phoneArray.join("");
            console.log(realPhone)
            console.log(phoneArray)
            customer = await User.findOne({ phoneNumber: realPhone });
        }
        let bookings = await Booking.find({ businessId: req.body.businessId, customer: customer._id, date: date.dateString });
        let timeNum = 0;
        let cost = 0;
        for (let i = 0; i < req.body.serviceIds.length; i++) {
            let service = await ServiceType.findOne({ _id: req.body.serviceIds[i] });
            console.log(service)
            timeNum += utils.timeDurationStringToInt[service.timeDuration];
            cost += Number(service.cost);
            console.log(cost)
        }
        const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeStart] + timeNum];
        const costString = cost.toString();
        const splitCostString = costString.split('.');
        let goodCost = "";
        if (splitCostString.length > 1) {
            console.log("ANYTHING??")
            if (splitCostString[1].length === 1) {
                splitCostString[1] = splitCostString[1] + "0";
                goodCost = "$" + splitCostString[0] + "." + splitCostString[1];
                console.log(goodCost)
            }
            else {
                goodCost = "$" + costString;
            }
        }
        else {
            goodCost = "$" + costString + ".00";
        }
        console.log(goodCost)
        console.log("BELOW GOOD COST")
        const shift = await Shift.findOne({ shiftDate: date.dateString, employeeId: req.body.employeeId });
        const bcn = shift.bookingColumnNumber;
        let newBooking = new Booking({
            serviceType: req.body.serviceIds,
            time: `${req.body.timeStart}-${endTime}`,
            businessId: req.body.businessId,
            customer: customer._id,
            date: date.dateString,
            employeeBooked: req.body.employeeId,
            cost: goodCost,
            bcn: bcn
        });
        await newBooking.save();
        if (newBooking) {
            return res.status(200).json({ newBooking });
        }
    }

    catch (error) {
        console.log(error)
    }
})


router.post("/user", userAuth, async (req, res) => {
    try {
        let date = utils.getStringDateTime(req.body.timeStart, req.body.date);
        let bookings = await Booking.find({ businessId: req.body.businessId, customer: req.user.id, date: date.dateString });
        let timeNum = 0;
        let cost = 0;
        for (let i = 0; i < req.body.serviceIds.length; i++) {
            let service = await ServiceType.findOne({ _id: req.body.serviceIds[i] });
            timeNum += utils.timeDurationStringToInt[service.timeDuration];
            cost += Number(service.cost);
        }
        let endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeStart] + timeNum];
        let costString = cost.toString();
        let splitCostString = costString.split('.');
        let goodCost = "";
        if (splitCostString.length > 1) {
            if (splitCostString[1].length === 1) {
                splitCostString[1] = splitCostString[1] + "0";
                goodCost = "$" + splitCostString[0] + "." + splitCostString[1];
            }
        }
        else {
            goodCost = "$" + costString + ".00";
        }
        if (bookings.length === 0) {
            let shift = await Shift.findOne({ shiftDate: date.dateString, employeeId: req.body.employeeId });
            let bcn = shift.bookingColumnNumber;
            console.log(shift);
            console.log(bcn)
            let newBooking = new Booking({
                serviceType: req.body.serviceIds,
                time: `${req.body.timeStart}-${endTime}`,
                businessId: req.body.businessId,
                customer: req.user.id,
                date: date.dateString,
                employeeBooked: req.body.employeeId,
                cost: goodCost,
                bcn: bcn
            });
            await newBooking.save();
            if (newBooking) {
                return res.status(200).json({ newBooking });
            }
        }
        else {
            return res.status(406).send();
        }
    }

    catch (error) {
        console.log(error)
    }
})


module.exports = router;