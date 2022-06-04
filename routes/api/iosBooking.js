const express = require("express");
const Booking = require("../../models/Booking");
const router = express.Router();
const userAuth = require('../../middleware/authUser');
const ServiceType = require("../../models/ServiceType");
const utils = require("../../utils/utils");
const Employee = require("../../models/Employee");
const Shift = require("../../models/Shift");
const User = require("../../models/User");
const Notification = require("../../models/Notification");
const Admin = require("../../models/Admin");
const authAdmin = require("../../middleware/authAdmin");
const BookedNotification = require("../../models/BookedNotification");
const Business = require("../../models/Business");

router.post("/admin", async (req, res) => {
        const date = utils.getStringDateTime(req.body.timeStart, req.body.date);
        const dateo = new Date();
        let customer;
        if (req.body.phone && req.body.phone !== "") {
            let phoneArray = req.body.phone.split("");
            console.log(phoneArray)
            for (let i = 0; i < phoneArray.length; i++) {
                if (phoneArray[i] !== "0" && phoneArray[i] !== "1" && phoneArray[i] !== "2" && phoneArray[i]
                 !== "3" && phoneArray[i] !== "4" && phoneArray[i] !== "5" && phoneArray[i] !== "6"
                 && phoneArray[i] !== "7" && phoneArray[i] !== "8" && phoneArray[i] !== "9") {
                    delete phoneArray[i];
                }
            }
            let realPhone = phoneArray.join("");
            console.log(realPhone)
            console.log(phoneArray)
            customer = await User.findOne({ phoneNumber: realPhone });
        }
        if (customer) {
            let bookings = await Booking.find({ businessId: req.body.businessId, customer: customer._id, date: date.dateString });
            let timeNum = 0;
            let cost = 0;
            for (let i = 0; i < req.body.serviceIds.length; i++) {
                let service = await ServiceType.findOne({ _id: req.body.serviceIds[i] });
                    timeNum += utils.timeDurationStringToInt[service.timeDuration];
                    cost += service.cost;
                }
            cost = utils.convertNumToStringDollars(cost);
            const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeStart] + timeNum];
            console.log(endTime, "im endtime");
            console.log(typeof(req.body.bcn))
            console.log("BELOW GOOD COST")
            const shift = await Shift.findOne({ shiftDate: date.dateString, employeeId: req.body.employeeId });
            let bcn;
            if (shift) {
               bcn = shift.bookingColumnNumber;
            }
            else if (typeof(req.body.bcn) === typeof(1)) {
                bcn = req.body.bcn;
            }
            if (!bcn) {
                return res.status(409).send();
            }
           
            let newBooking = new Booking({
                serviceType: req.body.serviceIds,
                time: `${req.body.timeStart}-${endTime}`,
                businessId: req.body.businessId,
                customer: customer._id,
                date: date.dateString,
                employeeBooked: req.body.employeeId,
                cost: req.body.cost ? req.body.cost : cost,
                bcn: bcn
            });
            let business = await Business.findOne({_id: req.body.businessId});
            console.log(dateo.getHours())
            console.log(utils.cutDay(`${dateo.toDateString()}, ${utils.convertTime(dateo.getHours(), dateo.getMinutes())}`))
            let newNoti = new Notification({
                date: utils.cutDay(`${dateo.toDateString()}, ${utils.convertTime(dateo.getHours(), dateo.getMinutes())}`),
                fromString: business.businessName,
                fromId: req.body.businessId,
                type: "BBY" // Business Booked You
            })
            const customerNotis = [newNoti, ...customer.notifications];
            customer.notifications = customerNotis;
            await customer.save();
            await newNoti.save();
            await newBooking.save();
            if (newBooking) {
                return res.status(200).json({ newBooking });
            }
        } else {
            console.log("stupid")
            res.status(406).send();
        }
})

router.post("/admin/area", async (req, res) => {
    console.log(req.body);
    const date = utils.getStringDateTime(req.body.timeStart, req.body.date);
    let customer;
    if (req.body.phone && req.body.phone !== "") {
        let phoneArray = req.body.phone.split("");
        console.log(phoneArray)
        for (let i = 0; i < phoneArray.length; i++) {
            if (phoneArray[i] !== "0" && phoneArray[i] !== "1" && phoneArray[i] !== "2" && phoneArray[i]
             !== "3" && phoneArray[i] !== "4" && phoneArray[i] !== "5" && phoneArray[i] !== "6"
             && phoneArray[i] !== "7" && phoneArray[i] !== "8" && phoneArray[i] !== "9") {
                delete phoneArray[i];
            }
        }
        let realPhone = phoneArray.join("");
        console.log(realPhone)
        console.log(phoneArray)
        customer = await User.findOne({ phoneNumber: realPhone });
    }
    if (customer) {
        let bookings = await Booking.find({ businessId: req.body.businessId, customer: customer._id, date: date.dateString });
        let timeNum = 0;
        let cost = 0;
        for (let i = 0; i < req.body.serviceIds.length; i++) {
            let service = await ServiceType.findOne({ _id: req.body.serviceIds[i] });
                timeNum += utils.timeDurationStringToInt[service.timeDuration];
                cost += service.cost;
            }
        const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeStart] + timeNum];

        const shift = await Shift.findOne({ shiftDate: date.dateString, employeeId: req.body.employeeId });
        console.log(req.body.serviceIds);
        console.log("BELOW SERVICE IDS")
        let newBooking = new Booking({
            serviceType: req.body.serviceIds,
            time: `${req.body.timeStart}-${endTime}`,
            businessId: req.body.businessId,
            customer: customer._id,
            date: date.dateString,
            cost: req.body.cost ? req.body.cost : cost,
            bcn: req.body.bcn
        });
        await newBooking.save();
        if (newBooking) {
            return res.status(200).json({ newBooking });
        }
    } else {
        console.log("stupid")
        res.status(406).send();
    }
})

router.post("/user/area", userAuth, async (req, res) => {
    try {
        console.log("potato chip")
        const date = new Date();
        const dateNeeded = new Date(req.body.date);
        console.log(req.user)
        const user = await User.findOne({ _id: req.user.id });
        const sendBookingRequest = new BookedNotification({
                date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
                fromId: user._id,
                fromString: user.fullName,
                type: "UBU",
                ps: req.body.serviceIds,
                potentialStartTime: req.body.timeStart,
                potentialDate: dateNeeded.toDateString(),
            });
        let admin = await Admin.findOne({business: req.body.businessId});
        console.log(admin)
        let adminBookedNotis = [...admin.bookedNotifications, sendBookingRequest];
        console.log(admin)
        admin.bookedNotifications = adminBookedNotis;
        await admin.save();
        await sendBookingRequest.save();
        console.log(req.body)
        res.status(200).send();
    }
    catch (error) {
        console.log(error)
    }
})

router.post("/admin/clone", async (req, res) => {
    try {
    const date = utils.getStringDateTime(req.body.timeStart, req.body.date);
    const dates = [];
    for (let i = 0; i < req.body.dates.length; i++) {
        dates.push(req.body.dates[i]);
    }
      console.log(dates);
    let customer;
    if (req.body.phone && req.body.phone !== "") {
        let phoneArray = req.body.phone.split("");
        console.log(phoneArray)
        for (let i = 0; i < phoneArray.length; i++) {
            if (phoneArray[i] !== "0" && phoneArray[i] !== "1" && phoneArray[i] !== "2" && phoneArray[i]
             !== "3" && phoneArray[i] !== "4" && phoneArray[i] !== "5" && phoneArray[i] !== "6"
             && phoneArray[i] !== "7" && phoneArray[i] !== "8" && phoneArray[i] !== "9") {
                delete phoneArray[i];
            }
        }
        let realPhone = phoneArray.join("");
        console.log(realPhone)
        console.log(phoneArray)
        customer = await User.findOne({ phoneNumber: realPhone });
    }
    if (customer) {
        let bookings = await Booking.find({ businessId: req.body.businessId, customer: customer._id, date: date.dateString });
        let timeNum = 0;
        for (let i = 0; i < req.body.serviceIds.length; i++) {
            let service = await ServiceType.findOne({ _id: req.body.serviceIds[i] });
                timeNum += utils.timeDurationStringToInt[service.timeDuration];
            }
        const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeStart] + timeNum];
        console.log(endTime, "im endtime");
        console.log(typeof(req.body.bcn))
        console.log("BELOW GOOD COST")
        const shift = await Shift.findOne({ shiftDate: date.dateString, employeeId: req.body.employeeId });
        let bcn;
        if (shift) {
           bcn = shift.bookingColumnNumber;
        }
        else if (typeof(req.body.bcn) === typeof(1)) {
            bcn = req.body.bcn;
        }
        if (!bcn) {
            return res.status(409).send();
        }

        for (let i = 0; i < dates.length; i++) {
            let newBooking = new Booking({
                serviceType: req.body.serviceIds,
                time: `${req.body.timeStart}-${endTime}`,
                businessId: req.body.businessId,
                customer: customer._id,
                date: dates[i],
                employeeBooked: req.body.employeeId,
                cost: req.body.cost,
                bcn: bcn
            });
            await newBooking.save();
        }
            return res.status(200).send();
        
    } else {
        console.log("stupid")
        res.status(406).send();
    }
} catch(error) {
    console.log(error)
}
})

router.post("/admin/clone/area", async (req, res) => {
    try {
    const date = utils.getStringDateTime(req.body.timeStart, req.body.date);
    const dates = [];
    for (let i = 0; i < req.body.dates.length; i++) {
        dates.push(req.body.dates[i]);
    }
      console.log(dates);
    let customer;
    if (req.body.phone && req.body.phone !== "") {
        let phoneArray = req.body.phone.split("");
        console.log(phoneArray)
        for (let i = 0; i < phoneArray.length; i++) {
            if (phoneArray[i] !== "0" && phoneArray[i] !== "1" && phoneArray[i] !== "2" && phoneArray[i]
             !== "3" && phoneArray[i] !== "4" && phoneArray[i] !== "5" && phoneArray[i] !== "6"
             && phoneArray[i] !== "7" && phoneArray[i] !== "8" && phoneArray[i] !== "9") {
                delete phoneArray[i];
            }
        }
        let realPhone = phoneArray.join("");
        console.log(realPhone)
        console.log(phoneArray)
        customer = await User.findOne({ phoneNumber: realPhone });
    }
    if (customer) {
        let bookings = await Booking.find({ businessId: req.body.businessId, customer: customer._id, date: date.dateString });
        let timeNum = 0;
        for (let i = 0; i < req.body.serviceIds.length; i++) {
            let service = await ServiceType.findOne({ _id: req.body.serviceIds[i] });
                timeNum += utils.timeDurationStringToInt[service.timeDuration];
            }
        const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeStart] + timeNum];
        for (let i = 0; i < dates.length; i++) {
            let newBooking = new Booking({
                serviceType: req.body.serviceIds,
                time: `${req.body.timeStart}-${endTime}`,
                businessId: req.body.businessId,
                customer: customer._id,
                date: dates[i],
                cost: req.body.cost,
                bcn: req.body.bcn
            });
            await newBooking.save();
        }
            return res.status(200).send();
    } else {
        console.log("stupid")
        res.status(406).send();
    }
} catch(error) {
    console.log(error)
}
})

// router.post("/confirmUserBooked", async (req, res) => {
//     try {
//         let admin = await Admin.findOne({})
//     }
// })

/*
    so imagine a plane is starting directly above the radar station and think of it as flying away where r=20 i can find the horizontal distance so i know the vertical distance. use pythag theorem to find velocity at a certain point which is when r=20.
    since r is decreasing which is why dr/dt = -400, answer is -500 in the horizontal direction. imagine plane is started from the right to the left. which in physics can be used to describe that direction of motion
    
    i assumed it flew perfectly horizontal and since it just said the distance between the radar and plane its typically assumed that its the straight line distance between two points which is the hypot of right triangle
    */

router.post("/admin/newGuest", async (req, res) => {
    try {
        console.log(req.body)
        const date = utils.getStringDateTime(req.body.timeStart, req.body.date);
        const preExistingCustomer = await User.findOne({ phoneNumber: req.body.phone });
        if (preExistingCustomer) {
            res.status(409).send();
            return;
        }
        let customer = new User({
            newGuest: true,
            phoneNumber: req.body.phone,
            fullName: req.body.name
        })
        console.log(customer)
        if (customer) {
            // let bookings = await Booking.find({ businessId: req.body.businessId, customer: customer._id, date: date.dateString });
            let timeNum = 0;
            for (let i = 0; i < req.body.serviceIds.length; i++) {
                let service = await ServiceType.findOne({ _id: req.body.serviceIds[i] });
                console.log(service)
                timeNum += utils.timeDurationStringToInt[service.timeDuration];
            }
            const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeStart] + timeNum];
            console.log("BELOW GOOD COST")
            const shift = await Shift.findOne({ shiftDate: date.dateString, employeeId: req.body.employeeId });
            let bcn;
            if (shift) {
               bcn = shift.bookingColumnNumber;
            }
            else if (typeof(req.body.bcn) === typeof(1)) {
                bcn = req.body.bcn;
            }
            if (!bcn) {
                return res.status(409).send();
            }
            let newBooking = new Booking({
                serviceType: req.body.serviceIds,
                time: `${req.body.timeStart}-${endTime}`,
                businessId: req.body.businessId,
                customer: customer._id,
                date: date.dateString,
                employeeBooked: req.body.employeeId,
                cost: req.body.cost,
                bcn: bcn
            });
            await newBooking.save();
            if (newBooking) {
                const bookings = [...customer.bookings, newBooking];
                customer.bookings = bookings;
                await customer.save();
                return res.status(200).json({ newBooking });
            }
        } else {
            console.log("stupid")
            res.status(406).send();
        }
    }

    catch (error) {
        console.log(error)
    }
})

router.post("/admin/newGuest/clone", async (req, res) => {
    try {
        const date = utils.getStringDateTime(req.body.timeStart, req.body.date);
        const preExistingCustomer = await User.findOne({ phoneNumber: req.body.phone });
        if (preExistingCustomer) {
            res.status(409).send();
            return;
        }
        let customer = new User({
            newGuest: true,
            phoneNumber: req.body.phone,
            fullName: req.body.name
        });
        if (customer) {
            let timeNum = 0;
            for (let i = 0; i < req.body.serviceIds.length; i++) {
                let service = await ServiceType.findOne({ _id: req.body.serviceIds[i] });
                console.log(service)
                timeNum += utils.timeDurationStringToInt[service.timeDuration];
            }
            const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeStart] + timeNum];
            const shift = await Shift.findOne({ shiftDate: date.dateString, employeeId: req.body.employeeId });
            let bcn;
            if (shift) {
               bcn = shift.bookingColumnNumber;
            }
            else if (typeof(req.body.bcn) === typeof(1)) {
                bcn = req.body.bcn;
            }
            if (!bcn) {
                return res.status(409).send();
            }
            for (let i = 0; i < req.body.dates.length; i++) {
                let newBooking = new Booking({
                    serviceType: req.body.serviceIds,
                    time: `${req.body.timeStart}-${endTime}`,
                    businessId: req.body.businessId,
                    customer: customer._id,
                    date: req.body.dates[i],
                    employeeBooked: req.body.employeeId,
                    cost: req.body.cost,
                    bcn: bcn
                });
                await newBooking.save();
            }
                await customer.save();
                return res.status(200).send()
            
        } else {
            console.log("stupid")
            res.status(406).send();
        }
    }

    catch (error) {
        console.log(error)
    }
})

 // let data = ["timeStart": timeStart, "date": date, "serviceIds": serviceIdsArray, "employeeId": employeeId, "businessId": businessId] as [String : Any];

router.post("/sendNotiFromUser", userAuth, async (req, res) => {
    try {
        const date = new Date();
        let dateNeeded = new Date(req.body.date)
        const user = await User.findOne({ _id: req.user.id });
        let sendBookingRequest;
        if (req.body.employeeId) {
            sendBookingRequest = new BookedNotification({
                date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
                fromId: user._id,
                fromString: user.fullName,
                type: "UBU",
                ps: req.body.serviceIds,
                potentialStartTime: req.body.timeStart,
                potentialDate: dateNeeded.toDateString(),
                potentialEmployee: req.body.employeeId
            });
        }
        else {
            sendBookingRequest = new BookedNotification({
                date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
                fromId: user._id,
                fromString: user.fullName,
                type: "UBU",
                ps: req.body.serviceIds,
                potentialStartTime: req.body.timeStart,
                potentialDate: date.toDateString(),
                potentialEmployee: req.body.employeeId
            });
        }
        let employee = await Employee.findOne({ _id: req.body.employeeId });
        let eBookedNotis = [...employee.bookedNotifications, sendBookingRequest];
        employee.bookedNotifications = eBookedNotis;
        let admin = await Admin.findOne({ business: req.body.businessId });
        let adminBookedNotis = [...admin.bookedNotifications, sendBookingRequest];
        admin.bookedNotifications = adminBookedNotis;
        await admin.save();
        employee.save();
        await sendBookingRequest.save();
        console.log(req.body)
        res.status(200).send();
    }
    catch (error) {
        console.log(error)
    }
})

router.post("/delete", authAdmin, async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.body.bookingId, businessId: req.admin.businessId });
        if (booking) {
            await booking.deleteOne();
        }
        res.status(200).send();
    }
    catch (error) {
        console.log(error)
    }
})

router.post("/deleteFromUser", userAuth, async (req, res) => {
    console.log("anything")
    console.log(req.user)
    try {
        const booking = await Booking.findOne({ _id: req.body.bookingId, customer: req.user.id });
        if (booking) {
            console.log(booking)
            await booking.deleteOne();
        }
        res.status(200).send();
    }
    catch (error) {
        console.log(error)
    }
})


router.post("/user", userAuth, async (req, res) => {
    try {
        console.log(req.body.eq)
        if (req.body.eq) {
            // console.log(req.body);
            // return res.status(200).send();
        }
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

router.post("/acceptedUserRequest", async (req, res) => {
    let notification = await BookedNotification.findOne({_id: req.body.notiId});
    const date = utils.getStringDateTime(notification.potentialStartTime, notification.potentialDate);
    if (date.date < new Date()) {
        return res.status(409).send();
    }
    let customer = await User.findOne({_id: notification.fromId}).select(["bookings"]);
        if (customer) {
            let services = await ServiceType.find({_id: notification.ps});
            let timeNum = 0;
            let cost = 0;
            for (let i = 0; i < services.length; i++) {
                timeNum += utils.timeDurationStringToInt[services[i].timeDuration];
                cost += services[i].cost;
            }
            const endTime = utils.intToStringTime[utils.stringToIntTime[notification.potentialStartTime] + timeNum];
            let bcn;
            let business;
            if (req.body.businessId) {
                business = await Business.findOne({_id: req.body.businessId})
            }
            else if (req.body.employeeId) {
                const employee = await Employee.findOne({_id: req.body.employeeId});
                business = await Business.findOne({_id: employee.businessWorkingAt})
            }
            if (business.eq === "y") {
                const shifts = await Shift.find({shiftDate: date.dateString});
                if (shifts.length > 1) {
                    console.log("double shifts")
                    return;
                }
                else if (shifts.length === 1) {
                    bcn = shifts[0].bookingColumnNumber;
                }
                console.log(bcn)
            }
            else {
                bcn = req.body.bcn;
            }
        
            let newBooking = new Booking({
                time: `${notification.potentialStartTime}-${endTime}`,
                serviceType: notification.ps,
                businessId: business._id,
                cost: `$${cost}`,
                date: date.dateString,
                customer: notification.fromId,
                employeeBooked: notification.potentialEmployee,
                bcn
            })
            await newBooking.save();

            return res.status(200).send();
        }
    //         let bookings = await Booking.find({ businessId: req.body.businessId, customer: customer._id, date: date.dateString });
    //         let timeNum = 0;
    //         let cost = 0;
    //         let numOfFiveMinServices = 0;
    //         let numOfTenMinServices = 0;
    //         let numOfTwentyMinServices = 0;
    //         for (let i = 0; i < req.body.serviceIds.length; i++) {
    //             let service = await ServiceType.findOne({ _id: req.body.serviceIds[i] });
    //             if (service.timeDuration === "5 Minutes") {
    //                 numOfFiveMinServices += 1;
    //             }
    //             else if (service.timeDuration === "10 Minutes") {
    //                 numOfTenMinServices += 1;
    //                 console.log("ITS ME I RAN")
    //             }
    //             else if (service.timeDuration === "20 Minutes") {
    //                 numOfTwentyMinServices += 1;
    //             }
    //             else {
    //                 timeNum += utils.timeDurationStringToInt[service.timeDuration];
    //             }
    //             cost += Number(service.cost);
    //             console.log(cost, "cant be me")
    //         }

    //         let extraMinutesForBooking = 0;

    //         if (numOfFiveMinServices !== 0 || numOfTenMinServices !== 0 || numOfTwentyMinServices !== 0) {
    //             let minutes = 0;
    //             if (numOfFiveMinServices !== 0) {
    //                 let fiveCounter = 0;
    //                 while (fiveCounter < numOfFiveMinServices) {
    //                     fiveCounter++;
    //                     minutes += 5;
    //                 }
    //             }
    //             if (numOfTenMinServices !== 0) {
    //                 let tenCounter = 0;
    //                 while (tenCounter < numOfTenMinServices) {
    //                     tenCounter++;
    //                     minutes += 10;
    //                 }
    //             }
    //             if (numOfTwentyMinServices !== 0) {
    //                 let twentyCounter = 0;
    //                 while (twentyCounter < numOfTwentyMinServices) {
    //                     twentyCounter++;
    //                     minutes += 20;
    //                 }
    //             }
    //             console.log(numOfFiveMinServices);
    //             console.log(numOfTenMinServices);
    //             extraMinutesForBooking = minutes % 15;
    //             console.log("LOOK HERE");
    //             console.log(extraMinutesForBooking, minutes);
    //             const numToAdd = Math.ceil(minutes / 15);
    //             console.log(numToAdd);
    //             console.log(minutes)
    //             console.log(Math.ceil(minutes / 15));
    //             console.log("ABOVE")
    //             timeNum += numToAdd;
    //         }

    //         const endTime = utils.intToStringTime[utils.stringToIntTime[req.body.timeStart] + timeNum];
    //         console.log(endTime, "im endtime");
    //         const costString = cost.toString();
    //         const splitCostString = costString.split('.');
    //         let goodCost = "";
    //         if (splitCostString.length > 1) {
    //             console.log("ANYTHING??")
    //             if (splitCostString[1].length === 1) {
    //                 splitCostString[1] = splitCostString[1] + "0";
    //                 goodCost = "$" + splitCostString[0] + "." + splitCostString[1];
    //                 console.log(goodCost)
    //             }
    //             else {
    //                 goodCost = "$" + costString;
    //             }
    //         }
    //         else {
    //             goodCost = "$" + costString + ".00";
    //         }
    //         console.log(goodCost)
    //         console.log("BELOW GOOD COST")
    //         const shift = await Shift.findOne({ shiftDate: date.dateString, employeeId: req.body.employeeId });
    //         const bcn = shift.bookingColumnNumber;
    //         let newBooking = new Booking({
    //             extraMinutes: extraMinutesForBooking,
    //             serviceType: req.body.serviceIds,
    //             time: `${req.body.timeStart}-${endTime}`,
    //             businessId: req.body.businessId,
    //             customer: customer._id,
    //             date: date.dateString,
    //             employeeBooked: req.body.employeeId,
    //             cost: goodCost,
    //             bcn: bcn
    //         });
    //         await newBooking.save();
    //         if (newBooking) {
    //             return res.status(200).json({ newBooking });
    //         }
    //     } else {
    //         console.log("stupid")
    //         res.status(406).send();
    //     }
    // }

    // catch (error) {
    //     console.log(error)
    // }
    
})


module.exports = router;