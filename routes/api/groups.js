const router = require("express").Router();
const adminAuth = require("../../middleware/authAdmin");
const Booking = require("../../models/Booking");
const Group = require("../../models/Group");
const utils = require('../../utils/utils');
const Business = require("../../models/Business");
const BookedNotification = require('../../models/BookedNotification');
const Employee = require("../../models/Employee");
const userAuth = require("../../middleware/authUser");
const Admin = require("../../models/Admin");
const User = require('../../models/User');

router.post("/create", adminAuth, async (req, res) => {
    console.log(req.body);
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
        return res.status(406).json({bcnArray, bct: business.bookingColumnType});
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
    console.log(req.body);
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
    const employeeName = employee ? employee.name : "None";
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
    console.log(req.body);
    const groups = await Group.find({openToPublic: true, businessId: req.body.businessId}).select(["price", "time", "date", "groupLimitNumber", "customers", "type"]);
    const filteredByDate = [];
    for (let i = 0; i < groups.length; i++) {
        if ((new Date(groups[i].date).getDate() >= new Date().getDate() && new Date(groups[i].date).getMonth >= new Date().getMonth) || new Date(groups[i].date) >= new Date() ) {
            filteredByDate.push(groups[i]);
        }
    }
    const groupsToSend = [];
    const myGroups = await Group.find({customers: req.user.id})
    const groupsAlreadyIn = [];
    for (let i = 0; i < filteredByDate.length; i++) {
        myGroups.forEach(group => {
            if (group._id.toString() === filteredByDate[i]._id.toString()) {
                groupsAlreadyIn.push(filteredByDate[i]);
                filteredByDate.splice(i,1)
            }
        })
    }
    if (filteredByDate.length) {
        // console.log(groups);
        for (let i = 0; i < filteredByDate.length; i++) {
            if (Number(groups[i].groupLimitNumber) > filteredByDate[i].customers.length || filteredByDate[i].groupLimitNumber === "None") {
                groupsToSend.push({price: filteredByDate[i].price, time: filteredByDate[i].time, date: filteredByDate[i].date, type: filteredByDate[i].type, _id: filteredByDate[i]._id });
            }
        }
    }
    res.status(200).json({groups: groupsToSend, groupsAlreadyIn});
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

router.post("/leave", userAuth, async function(req, res) {
    try {
        const group = await Group.findOne({_id: req.body.groupId});
        console.log(group.customers, "hi");
        for (let i = 0; i < group.customers.length; i++) {
            if (group.customers[i].toString() === req.user.id.toString()) {
                console.log("hello")
                group.customers.splice(i, 1);
            }
        }
        await group.save();
        res.status(200).send();
    }
    catch(error) {
        res.status(400).send();
    }

})

router.post("/list", adminAuth, async (req, res) => {
    const admin = await Admin.findOne({_id: req.admin.id}).select(["business"]);
    const business = await Business.findOne({_id: admin.business});
    const groups = await Group.find({businessId: admin.business, date: req.body.dateString});
    const newGroups = []
    for (let i = 0; i < groups.length; i++) {
        let employee = await Employee.findOne({_id: groups[i].employeeBooked}).select(["fullName"]);
        let newGroup = {};
        let customers = await User.find({_id: groups[i].customers}).select("fullName");
        newGroup.customers = customers;
        newGroup.time = groups[i].time;
        newGroup._id = groups[i]._id;
        newGroup.employeeName = employee.fullName
        newGroup.bcn = groups[i].bcn;
        newGroup.openToPublic = groups[i].openToPublic;
        newGroup.groupLimitNumber = groups[i].groupLimitNumber;
        newGroup.name = groups[i].type;
        newGroups.push(newGroup)
    }
    res.status(200).json({groups: newGroups, bct: business.bookingColumnType});
})

router.post("/info", async(req, res) => {
    try {
        const group = await Group.findOne({_id: req.body.groupId})
        console.log(group);
        if (group) {
            const users = [];
            for (let i = 0; i < group.customers.length; i++) {
                const user = await User.findOne({_id: group.customers[i]}).select(["fullName"]);
                users.push({userId: user._id, fullName: user.fullName});
            }
            console.log()
            const employee = await Employee.findOne({_id: group.employeeBooked}).select(["fullName"]);
            console.log(employee);
            const groupBack = {users, employeeName: employee.fullName};
            return res.status(200).json({groupBack});
        
        }
    }
    catch(error) {
        console.log(error);
    }
})


router.post("/addNewCustomer", adminAuth, async (req, res) => {
    const date = new Date(req.body.date).toDateString();
    let phoneArray = req.body.phoneNumber.split("");
  for (let i = 0; i < phoneArray.length; i++) {
    if (phoneArray[i] !== "0" && phoneArray[i] !== "1" && phoneArray[i] !== "2" && phoneArray[i] !== "3" && phoneArray[i] !== "4" && phoneArray[i] !== "5" && phoneArray[i] !== "6" && phoneArray[i] !== "7" && phoneArray[i] !== "8" && phoneArray[i] !== "9") {
      phoneArray[i] = "";
    }
  }
  let realPhoneArray = phoneArray.filter(e => e !== "");
  console.log(phoneArray.length)
  if (realPhoneArray.length === 0) {
    return res.status(406).send();
  }
  let realPhone = realPhoneArray.join("");
  const user = await User.findOne({ phoneNumber: realPhone }).select(["fullName"]);
  if (user) {
    const group = await Group.findOne({_id: req.body.groupId});
    for (let i = 0; i < group.customers.length; i++) {
        if (group.customers[i].toString() === user._id.toString()) {
            return res.status(406).send();
        }
    }
    const customers = [...group.customers];
    customers.push(user._id);
    group.customers = customers;
    await group.save();

  //  let bookingsAlready = await Booking.find({ customer: user._id, date: date }); check this
    res.status(200).json({ user });
  } else {
    res.status(400).send();
  }
})

router.post('/delete', adminAuth, async (req, res) => {
    try {
        const group = await Group.findOne({_id: req.body.groupId});
        if (group) {
            await group.deleteOne();
            res.status(200).send();
        }
    } catch(error) {
        res.status(500).send();
    }
})

module.exports = router;