const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const Employee = require('../../models/Employee');
const Business = require('../../models/Business');
const adminAuth = require("../../middleware/authAdmin");
const TableBooking = require("../../models/TableBooking");
const utils = require("../../utils/utils");

router.get("/", adminAuth, async (req, res) => {
    const restaurant = await Business.findOne({_id: req.admin.businessId}).select(["tables", "boxHeight", "boxWidth", "schedule"]);
    if (restaurant) {
        res.status(200).json({restaurant});
    }
})

router.post('/checkIfUser', adminAuth, async(req, res) => {
    const user = await User.findOne({email: req.body.input});
    if (user) {
        return res.status(200).send();
    }
    else {
        return res.status(204).send();
    }
})

router.post("/bookTable", adminAuth, async (req, res) => {

    // check time
    try {
        const tableBookings = await TableBooking.find({date: req.body.date, businessId: req.admin.businessId});
        const num = utils.stringToIntTime[req.body.selectedTime];
        const bookedTables = [];
        for (let i = 0; i < tableBookings.length; i++) {
            let counter = utils.stringToIntTime[tableBookings[i].timeStart];
            while (counter <= utils.stringToIntTime[tableBookings[i].timeStart] + estDurationToNum[tableBookings[i].estDuration]) {
                if (num === counter) {
                    bookedTables.push(tableBookings[i]);
                }
                counter++;
            }
        }
        for (let z = 0; z < bookedTables.length; z++) {
            if (req.body.fakeId === bookedTables[z].fakeId) {
                return res.status(406).send();
            }
        }
        const currentDate = new Date();
        const currentTime = utils.getTime();
        const selectedDate = new Date(req.body.date + ", " + req.body.selectedTime);
        const selectedTime = req.body.selectedTime;
      
        const checker = utils.compareDates(currentDate.getFullYear(), selectedDate.getFullYear(), currentDate.getMonth(), selectedDate.getMonth(), currentDate.getDate(), selectedDate.getDate())

        if (!checker) {
            return res.status(400).send()
        }
        else if (checker === "sameDay") {
            if (utils.stringToIntTime[currentTime] - 2 > utils.stringToIntTime[selectedTime]) {

                return res.status(400).send();
            }
        }

        const tableBooking = new TableBooking({
            timeStart: req.body.selectedTime,
            date: req.body.date,
            employeeBooked: req.body.selectedEmployee,
            customerName: req.body.customerName,
            businessId: req.admin.businessId,
            estDuration: req.body.estDuration,
            fakeId: req.body.fakeId,
            numOfPeople: req.body.numPeople
        })
        await tableBooking.save();
        res.status(200).send();
    }
    catch(error) {
        console.log(error);
        res.status(500).send()
    }
})

const estDurationToNum = {"30 Minutes": 6, "40 Minutes": 8, "45 Minutes": 9, "50 Minutes": 10, "55 Minutes": 11, "1 Hour": 12, "1 Hour 15 Minutes": 15, "1 Hour 30 Minutes": 18, "2 Hours": 24 }

router.post("/checkIfBooked", adminAuth, async (req, res) => {
    const fakeTableBookings = await TableBooking.find({date: req.body.date, businessId: req.admin.businessId});
    const tableBookings = [];
    for (let i = 0; i < fakeTableBookings.length; i++) {
        let employeeName = await Employee.findOne({_id: fakeTableBookings[i].employeeBooked}).select(["fullName"]);
        let obj = {
            employeeName: employeeName.fullName,
            employeeBooked: employeeName._id,
            customerName: fakeTableBookings[i].customerName,
            estDuration: fakeTableBookings[i].estDuration,
            date: fakeTableBookings[i].date,
            fakeId: fakeTableBookings[i].fakeId,
            timeStart: fakeTableBookings[i].timeStart,
            numOfPeople: fakeTableBookings[i].numOfPeople,
            _id: fakeTableBookings[i]._id
        }
        tableBookings.push(obj)
    }

    const num = utils.stringToIntTime[req.body.selectedTime];
    const bookedTables = [];
    for (let i = 0; i < tableBookings.length; i++) {
        let counter = utils.stringToIntTime[tableBookings[i].timeStart];
        while (counter <= utils.stringToIntTime[tableBookings[i].timeStart] + estDurationToNum[tableBookings[i].estDuration]) {
            if (num === counter) {
                bookedTables.push(tableBookings[i]);
            }
            counter++;
        }
    }
    let notCurrentlyInUse = [];
    if (bookedTables.length) {
        tableBookings.forEach(booking => {
            for (let i = 0; i < bookedTables.length; i++) {
                if (booking.fakeId !== bookedTables[i].fakeId) {
                    notCurrentlyInUse.push(booking);
                    break;
                }
            }
        })
    }
    else {
        notCurrentlyInUse = tableBookings;
    }
    const bookedWithinHour = [];
    const soonToBeBooked = [];
    for (let i = 0; i < notCurrentlyInUse.length; i++) {
        if (utils.stringToIntTime[notCurrentlyInUse[i].timeStart] > num) {
            let counter = num + 12;
            while (counter >= num) {
                if (utils.stringToIntTime[notCurrentlyInUse[i].timeStart] === counter) {
                    if (utils.stringToIntTime[notCurrentlyInUse[i].timeStart] - 6 > num) {
                        bookedWithinHour.push(notCurrentlyInUse[i]);
                    }
                    else {
                        soonToBeBooked.push(notCurrentlyInUse[i]);
                    }
                }
                counter--;
            }
        }
    }
    res.status(200).json({bookedTables, soonToBeBooked, bookedWithinHour})
})

router.post("/updateTables", adminAuth, async (req, res) => {
    const business = await Business.findOne({_id: req.admin.businessId});
    console.log(req.body);
    business.tables = req.body.tables;
    await business.save();
    res.status(200).send();
})

router.post('/deleteTableBooking', adminAuth, async (req, res) => {
    try {
        const tableBooking = await TableBooking.findOne({_id: req.body.deletingId});
        if (tableBooking) {
            await TableBooking.deleteOne({_id: tableBooking._id});
            res.status(200).send();
        }
        else {
            res.status(400).send()
        }
    }
    catch(error) {
        res.status(400).send();
    }
})

router.post("/addMenuCategory", adminAuth, async (req, res) => {
    try {
        const business = await Business.findOne({_id: req.admin.businessId});
        let menu;
        if (business.menu) {
            menu = business.menu;
            menu.push({menuCategoryValue: req.body.menuCategoryValue, catItems: []});
        }
        else {
            menu = [{menuCategoryValue: req.body.menuCategoryValue, catItems: []}];
        }
        business.menu = menu;
        await business.save();
        res.status(200).send();
    }
    catch (error) {
        console.log(error);
        return res.status(404).send();
    }
})

router.post("/addMenuItem", adminAuth, async (req, res) => {
    try {
        const business = await Business.findOne({_id: req.admin.businessId});
        const index = req.body.index;
        business.menu[index].catItems.push({"name": req.body.name, "description": req.body.description, "price": req.body.price});
        business.markModified("menu");
        await business.save();
        return res.status(200).send();
    }
    catch(error) {
        console.log(error);
        return res.status(404).send();
    }
})


router.get("/getMenu", adminAuth, async (req, res) => {
    const business = await Business.findOne({_id: req.admin.businessId});
    const menu = business.menu;
    console.log(menu);
    return res.status(200).send({menu});
});


// router.post('/tableStatus', async (req, res) => {
//     const time
// })

module.exports = router;