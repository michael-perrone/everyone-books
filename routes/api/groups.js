const router = require("express").Router();
const adminAuth = require("../../middleware/authAdmin");
const Booking = require("../../models/Booking");
const Group = require("../../models/Group");
const utils = require('../../utils/utils');
const Business = require("../../models/Business");
const BookedNotification = require('../../models/BookedNotification');
const Employee = require("../../models/Employee");
const userAuth = require("../../middleware/authUser");

router.post("/create", adminAuth, async (req, res) => {
    const otherDate = new Date();
    const date = new Date(req.body.date).toDateString();
    const customers = await User.find({_id: req.body.customers}).select(["fullName", "bookedNotifications"]);
    const customersWhoCant = [];
    let cNums = utils.getNumsFromTimes(`${req.body.startTime}-${req.body.endTime}`)
    for (let i = 0; i < customers.length; i++) {
        let customerBookings = await Booking.find({customer: customers[i]._id, date: date});
        for (let z = 0; z < customerBookings.length; z++) {
            let cbNums = utils.getNumsFromTimes(customerBookings[z].time);
            if(cbNums.some(element => cNums.some(cNumElement => cNumElement === element))) {
                return res.status(403).json({cName: customers[i].fullName})
                }
            }
        }
    const employeeBookings = await Booking.find({employeeBooked: req.body.employeeId, date: date});
    const employeeGroups = await Group.find({employeeBooked: req.body.employeeId, date: date})
    const allEmployeeBookings = [...employeeBookings, ...employeeGroups];
    for (let i = 0; i < allEmployeeBookings.length; i++) {
        const ebNums = utils.getNumsFromTimes(allEmployeeBookings[i].time);
        if (cNums.some(element => ebNums.some(ebNumElement => ebNumElement === element))) {
            return res.status(404).send();
        }
    }
    const takenBcns = [];
    const bookings = await Booking.find({date: date, businessId: req.admin.businessId});
    const groups = await Group.find({date: date, businessId: req.admin.businessId});
    console.log(groups)
    const allBookings = [...bookings, ...groups];

    for (let i = 0; i < allBookings.length; i++) {
        const abNums = utils.getNumsFromTimes(allBookings[i].time);
        if (cNums.some(element => abNums.some(abNumElement => abNumElement === element))) {
            console.log(allBookings[i].bcn)
            takenBcns.push(allBookings[i].bcn);
        }
    }

    const business = await Business.findOne({_id: req.admin.businessId});
    const bcnArray = [];
    let i = 1;
    while (i <= Number(business.bookingColumnNumber)) {
      if (takenBcns.every(element => Number(element) !== i)) {
            bcnArray.push(i);
      }
      i++;
    }

    if (bcnArray.every(element => element !== Number(req.body.bcn))) {
        return res.status(403).json({bcnArray, bct: business.bookingColumnType});
    }

    let price = req.body.price;
    let finalPrice;
    let pricer = price.toString();
    let priceArray = pricer.split(".");
    console.log(priceArray);
    if (priceArray.length > 1) {
        let secondHalf = priceArray[1].split("");
        if (secondHalf.length === 2) {
            finalPrice = "$" + price;
        }
        else if (secondHalf.length > 2) {
            if (secondHalf[2] > 4) {
                secondHalf[1] = (Number(secondHalf[1] + 1)).toString();
                finalPrice = "$" + priceArray[0] + "." + secondHalf[0] + secondHalf[1];
            }
            finalPrice = "$" + priceArray[0] + "." + secondHalf[0] + secondHalf[1];
        }
        else if (secondHalf.length === 1) {
            finalPrice = "$" + priceArray[0]+ "." + secondHalf[0] + "0";
        }
    }

    const group = new Group({
        price: finalPrice,
        time: `${req.body.startTime}-${req.body.endTime}`,
        businessId: req.admin.businessId,
        date: date,
        employeeBooked: req.body.employeeBooked,
        type: req.body.type,
        customers: req.body.customers,
        bcn: req.body.bcn,
        openToPublic: req.body.groupOpen,
        groupLimitNumber: req.body.groupLimitNumber === "No Limit" ? "None": req.body.groupLimitNumber

    });
    const employee = await Employee.findOne({_id: req.body.employeeBooked});
    const employeeName = employee.name;
    const noti = new BookedNotification({
        date: utils.cutDay(`${otherDate.toDateString()}, ${utils.convertTime(otherDate.getHours(), otherDate.getMinutes())}`),
        fromString: business.businessName,
        fromId: business._id,
        potentialStartTime: req.body.startTime,
        potentialDate: date,
        potentialEmployee: employeeName,
        type: "UATG"
    });
    await noti.save();
    customers.forEach(async customer => {
        const customerNotis = [noti, ...customer.bookedNotifications];
        customer.bookedNotifications = customerNotis;
        await customer.save();
    })
    await group.save();
    return res.status(200).send();
})

router.post("/userLeft", userAuth, async (req, res) => {
    console.log(req.user)
    const group = await Group.findOne({_id: req.body.groupId});
    const user = await User.findOne({_id: req.user.id});
    const newCustomers = group.customers.filter(customer => {
        return customer.toString() !== user._id.toString()
    })
    group.customers = newCustomers;
    await group.save();
    return res.status(200).send();
})

router.post('/newCustomersAdded', adminAuth, async (req, res) => {
    const group = await Group.findOne({_id: req.body.groupId});
    const newCustomers = [...req.body.customersArray, ...group.customers];
    group.customers = newCustomers;
    await group.save();
    res.status(200).send();
})

router.post("/deleteCustomer", adminAuth, async (req, res) => {
    const group = await Group.findOne({_id: req.body.groupId});
    console.log(group.customers, "GROUP.CUSTOMERS");
    console.log(req.body.customerId, "REQ.BODY.CID");
    const newCustomers = group.customers.filter(e => e.toString() !== req.body.customerId.toString());
    group.customers = newCustomers;
    await group.save();
    res.status(200).send();
})

router.post("/delete", adminAuth, async (req, res) => {
    const group = await Group.findOne({_id: req.body.groupId});
    if (group) {
        await Group.deleteOne({_id: req.body.groupId});
        res.status(200).send();
    }
})

router.post("/toJoin", userAuth, async (req, res) => {
    let groups = await Group.find({openToPublic: true, businessId: req.body.businessId}).select(["price", "time", "date", "groupLimitNumber", "customers", "type"]);
    // console.log(groups);
    const groupsToSend = [];
    let myGroups = await Group.find({customers: req.user.id})
    for (let i = 0; i < groups.length; i++) {
        myGroups.forEach(group => {
            if (group._id.toString() === groups[i]._id.toString()) {
                groups.splice(i,1)

            }
        })
    }
    console.log(groups);
    if (groups.length) {
        // console.log(groups);
        for (let i = 0; i < groups.length; i++) {
            if (Number(groups[i].groupLimitNumber) > groups[i].customers.length || groups[i].groupLimitNumber === "None") {
                groupsToSend.push({price: groups[i].price, time: groups[i].time, date: groups[i].date, type: groups[i].type, _id: groups[i]._id });
            }
        }
    }
    res.status(200).json({groups: groupsToSend});
})

router.post("/join", userAuth, async (req, res) => {
    const user = await User.findOne({_id: req.user.id});
    if (user) {
        const group = await Group.findOne({_id: req.body.groupId});
        if (group) {
            const newCustomers = [...group.customers, user._id];
            group.customers = newCustomers;
            await group.save();
            return res.status(200).send();
        }
        else {
            return res.status(400).send();
        }
    }
    else {
        return res.status(401).send();
    }
})

module.exports = router;