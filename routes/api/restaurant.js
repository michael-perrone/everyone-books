const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const Employee = require('../../models/Employee');
const Business = require('../../models/Business');
const adminAuth = require("../../middleware/authAdmin");
const TableBooking = require("../../models/TableBooking");
const utils = require("../../utils/utils");
const userAuth = require("../../middleware/authUser");
const BookedNotification = require("../../models/BookedNotification");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const BusinessProfile = require("../../models/BusinessProfile");

router.get("/checkTables", adminAuth, async (req, res) => {
    const business = await Business.findOne({_id: req.admin.businessId});
    if (business) {
        console.log(business);
        res.status(200).json({groups: business.groups, businessId: business._id});
    }
})

router.post("/checkBusiness", adminAuth, async (req, res) => {
  const business = await Business.findOne({_id: req.admin.businessId});
  console.log(req.body.date)
  const tableBookings = await TableBooking.find({businessId: req.admin.businessId, date: req.body.date});
  if (business) {
      res.status(200).json({business, tableBookings});
  }
})

router.get("/groups", adminAuth, async (req, res) => {
  const business = await Business.findOne({_id: req.admin.businessId});
  if (business) {
    res.status(200).json({groups: business.groups});
  }
})


router.post('/buildGroup', adminAuth, async (req, res) => {
    try {
        const business = await Business.findOne({_id: req.admin.businessId});
        business.groups.push(req.body.newGroup);
        await business.save();
        res.status(200).send();
    }
    catch(error) {
        console.log(error);
        res.status(500).send();
    }
})

router.post("/startRestaurant", async (req, res) => {
    const newBusiness = new Business({
              typeOfBusiness: req.body.typeOfBusiness,
              businessName: req.body.nameOfBusiness,
              address: req.body.address,
              city: req.body.city,
              zip: req.body.zip,
              state: req.body.state,
              schedule: req.body.schedule,
              website: req.body.website,
              phoneNumber: req.body.phoneNumber,
              eq: req.body.eq,
              groups: req.body.groupos
            });

            let newAdmin = new Admin({
                businessName: newBusiness.businessName,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email.toLowerCase(),
                password: req.body.password,
                business: newBusiness._id
              });
      
              const salt = await bcrypt.genSalt(10);
              newAdmin.password = await bcrypt.hash(
                req.body.password,
                salt
              );

              const payload = {
                admin: {
                  bn: newBusiness.businessName,
                  name: `${newAdmin.firstName} ${newAdmin.lastName}`,
                  isAdmin: true,
                  id: newAdmin.id,
                  businessId: newBusiness._id,
                  tob: newBusiness.typeOfBusiness
                }
              };

              jwt.sign(
                payload,
                config.get("adminSecret"),
                { expiresIn: 36000000000000 },
                (error, token) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("hello")
                    res.status(201).json({ token, businessId: newBusiness._id });
                  }
                }
              );

              try {
                await newAdmin.save();
                await newBusiness.save();
              } catch (error) {
                console.log(error)
              }
})

router.post('/createNewTable', adminAuth, async (req, res) => {
        const business = await Business.findOne({_id: req.admin.businessId});
        business.groups[req.body.index].tables.push(req.body.table);
        business.markModified("groups");
        await business.save();
        return res.status(200).send();
})

router.post('/deleteTable', adminAuth, async (req, res) => {
    try {
        const business = await Business.findOne({_id: req.admin.businessId});
        const groups = business.groups;
        const newTables = groups[req.body.groupIndex].tables.filter((e,i) => {
            return i !== req.body.tableIndex;
        })
        groups[req.body.groupIndex].tables = newTables;
        business.markModified("groups");
        await business.save();
        res.status(200).send();
    }   
    catch(error) {
        res.status(500).send();
    }
})

router.post('/createTableBooking', adminAuth, async (req, res) => {
  try {
    const business = await Business.findOne({_id: req.admin.businessId});
    if (business) {
      const allBookings = await TableBooking.find({businessId: req.admin.businessId, tableId: req.body.tableId, date: req.body.date});
      let newTableBooking = new TableBooking({
          timeStart: req.body.time,
          businessId: req.admin.businessId,
          date: req.body.date,
          customer: req.body.customer,
          employeeBooked: req.body.employeeBooked,
          tableId: req.body.tableId,
          numOfPeople: req.body.numOfPeople
      })
      await newTableBooking.save();
      res.status(200).json({newTableBooking});
    }
  }
  catch(error) {
    console.log(error)
  }
})

router.post('/seatingLocationSet', adminAuth, async (req, res) => {
    try{
        const business = await Business.findOne({_id: req.admin.businessId});
        const groups = business.groups;
        groups[req.body.index].seatingLocation = req.body.preference; 
        business.groups = groups;
        console.log(business.groups);
        business.markModified("groups");
        await business.save(); 
        res.status(200).send();
    }
    catch(error){
        res.status(500).send(); 
    }
})

router.get('/getEmployees', adminAuth, async (req, res) => {
  try {
    const bp = await BusinessProfile.findOne({business: req.admin.businessId});
    return res.status(200).json({employees: bp.employeesWhoAccepted})
  }
  catch(error) {
    console.log(error);
    res.status(500).send();
  }
})


router.post('/moreBookingInfo', adminAuth, async (req, res) => {
  try {
    const tableBooking = await TableBooking.findOne({_id: req.body.bookingId});
    const customer = await User.findOne({_id: tableBooking.customer}).select(["fullName", 'phoneNumber']);
    const employee = await Employee.findOne({_id: tableBooking.employeeBooked}).select(['fullName']);
    res.status(200).json({customer, employee});
  }
  catch(error) {
    res.status(500).send();
  }
})


// router.get("/", adminAuth, async (req, res) => {
//     console.log(req.admin.businessId, "IM THE REQ.ADMIN")
//     const restaurant = await Business.findOne({_id: req.admin.businessId}).select(["tables", "boxHeight", "boxWidth", "schedule", "c"]);
//     console.log(restaurant, "yooo");
//     if (restaurant) {
//         console.log(restaurant);
//         res.status(200).json({restaurant});
//     }
//     else {
//         console.log("hello?");
//     }
// })

// router.post('/checkIfUser', adminAuth, async(req, res) => {
//     const user = await User.findOne({email: req.body.input});
//     if (user) {
//         return res.status(200).send();
//     }
//     else {
//         return res.status(204).send();
//     }
// })

// router.post("/bookTable", adminAuth, async (req, res) => {
//     // check time
//     try {
//         const tableBookings = await TableBooking.find({date: req.body.date, businessId: req.admin.businessId});
//         const num = utils.stringToIntTime[req.body.selectedTime];
//         const bookedTables = [];
//         for (let i = 0; i < tableBookings.length; i++) {
//             let counter = utils.stringToIntTime[tableBookings[i].timeStart];
//             while (counter <= utils.stringToIntTime[tableBookings[i].timeStart] + estDurationToNum[tableBookings[i].estDuration]) {
//                 if (num === counter) {
//                     bookedTables.push(tableBookings[i]);
//                 }
//                 counter++;
//             }
//         }
//         for (let z = 0; z < bookedTables.length; z++) {
//             if (req.body.fakeId === bookedTables[z].fakeId) {
//                 if (utils.stringToIntTime[bookedTables[z].timeStart] + estDurationToNum[tableBookings[z].estDuration] === utils.stringToIntTime[req.body.selectedTime]) {
//                     break;
//                 }
//                 return res.status(406).send();
//             }
//         }
//         const currentDate = new Date();
//         const currentTime = utils.getTime();
//         const selectedDate = new Date(req.body.date + ", " + req.body.selectedTime);
//         const selectedTime = req.body.selectedTime;
//         const checker = utils.compareDates(currentDate.getFullYear(), selectedDate.getFullYear(), currentDate.getMonth(), selectedDate.getMonth(), currentDate.getDate(), selectedDate.getDate())

//         if (!checker) {
//             return res.status(400).send()
//         }
//         else if (checker === "sameDay") {
//             if (utils.stringToIntTime[currentTime] - 2 > utils.stringToIntTime[selectedTime]) {

//                 return res.status(400).send();
//             }
//         }

//         const tableBooking = new TableBooking({
//             timeStart: req.body.selectedTime,
//             date: req.body.date,
//             employeeBooked: req.body.selectedEmployee,
//             customerName: req.body.customerName,
//             businessId: req.admin.businessId,
//             estDuration: req.body.estDuration,
//             fakeId: req.body.fakeId,
//             numOfPeople: req.body.numPeople
//         })
//         await tableBooking.save();
//         res.status(200).send();
//     }
//     catch(error) {
//         console.log(error);
//         res.status(500).send()
//     }
// })

// const estDurationToNum = {"30 Minutes": 6, "40 Minutes": 8, "45 Minutes": 9, "50 Minutes": 10, "55 Minutes": 11, "1 Hour": 12, "1 Hour 15 Minutes": 15, "1 Hour 30 Minutes": 18, "2 Hours": 24 }

// router.post("/checkIfBooked", adminAuth, async (req, res) => {
//     const fakeTableBookings = await TableBooking.find({date: req.body.date, businessId: req.admin.businessId});
//     const tableBookings = [];
//     for (let i = 0; i < fakeTableBookings.length; i++) {
//         let employeeName = await Employee.findOne({_id: fakeTableBookings[i].employeeBooked}).select(["fullName"]);
//         let obj = {
//             employeeName: employeeName.fullName,
//             employeeBooked: employeeName._id,
//             customerName: fakeTableBookings[i].customerName,
//             estDuration: fakeTableBookings[i].estDuration,
//             date: fakeTableBookings[i].date,
//             fakeId: fakeTableBookings[i].fakeId,
//             timeStart: fakeTableBookings[i].timeStart,
//             numOfPeople: fakeTableBookings[i].numOfPeople,
//             _id: fakeTableBookings[i]._id
//         }
//         tableBookings.push(obj)
//     }

//     const num = utils.stringToIntTime[req.body.selectedTime];
//     const bookedTables = [];
//     for (let i = 0; i < tableBookings.length; i++) {
//         let counter = utils.stringToIntTime[tableBookings[i].timeStart];
//         while (counter <= utils.stringToIntTime[tableBookings[i].timeStart] + estDurationToNum[tableBookings[i].estDuration]) {
//             if (num === counter) {
//                 bookedTables.push(tableBookings[i]);
//             }
//             counter++;
//         }
//     }
//     let notCurrentlyInUse = [];
//     if (bookedTables.length) {
//         tableBookings.forEach(booking => {
//             for (let i = 0; i < bookedTables.length; i++) {
//                 if (booking.fakeId !== bookedTables[i].fakeId) {
//                     notCurrentlyInUse.push(booking);
//                     break;
//                 }
//             }
//         })
//     }
//     else {
//         notCurrentlyInUse = tableBookings;
//     }
//     const bookedWithinHour = [];
//     const soonToBeBooked = [];
//     for (let i = 0; i < notCurrentlyInUse.length; i++) {
//         if (utils.stringToIntTime[notCurrentlyInUse[i].timeStart] > num) {
//             let counter = num + 12;
//             while (counter >= num) {
//                 if (utils.stringToIntTime[notCurrentlyInUse[i].timeStart] === counter) {
//                     if (utils.stringToIntTime[notCurrentlyInUse[i].timeStart] - 6 > num) {
//                         bookedWithinHour.push(notCurrentlyInUse[i]);
//                     }
//                     else {
//                         soonToBeBooked.push(notCurrentlyInUse[i]);
//                     }
//                 }
//                 counter--;
//             }
//         }
//     }
//     res.status(200).json({bookedTables, soonToBeBooked, bookedWithinHour})
// })

// router.post("/updateTables", adminAuth, async (req, res) => {
//     const business = await Business.findOne({_id: req.admin.businessId});
//     console.log(req.body);
//     business.tables = req.body.tables;
//     business.c = req.body.cNum;
//     await business.save();
//     res.status(200).send();
// })

// router.post('/deleteTableBooking', adminAuth, async (req, res) => {
//     try {
//         const tableBooking = await TableBooking.findOne({_id: req.body.deletingId});
//         if (tableBooking) {
//             await TableBooking.deleteOne({_id: tableBooking._id});
//             res.status(200).send();
//         }
//         else {
//             res.status(400).send()
//         }
//     }
//     catch(error) {
//         res.status(400).send();
//     }
// })

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
        console.log(business.menu);
        console.log(index);
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


// router.post("/userTableRequest", userAuth, async (req, res) => {
//     const currentDate = new Date();
//     const currentTime = utils.getTime();
//     const selectedDate = new Date(req.body.dateString + ", " + req.body.time);
//     const selectedTime = req.body.time;
//     let check;
//     const checker = utils.compareDates(currentDate.getFullYear(), selectedDate.getFullYear(), currentDate.getMonth(), selectedDate.getMonth(), currentDate.getDate(), selectedDate.getDate());
//     if (checker === "sameDay") {
//         console.log(utils.stringToIntTime[selectedTime], utils.stringToIntTime[currentTime]);
//         if (utils.stringToIntTime[selectedTime] < utils.stringToIntTime[currentTime]) {
//            return res.status(405).send();
//         }
//         else {
//             check = true;
//         }
//     }
//     else if (checker === "futureDay") {
//         check = true;
//     }
//     if (!check) {
//         return res.status(405).send();
//     }
//     const business = await Business.findOne({_id: req.body.businessId});
//     const tablesHavePotential = [];
//     for (let i = 0; i < business.tables.length; i++) {
//         let biggestNum = business.tables[i].height > business.tables[i].width ? business.tables[i].height : business.tables[i].width;
//         console.log(utils.biggestNumConverter[biggestNum]);
//         if (utils.biggestNumConverter[biggestNum] >= Number(req.body.numOfPeople)) {
//             tablesHavePotential.push(business.tables[i]);
//         }
//     }
//     const tableBookings = await TableBooking.find({businessId: business._id, date: req.body.dateString});
//     console.log(tableBookings);
//     if (tablesHavePotential.length > 0) {
//         const badTables = [];
//         for (let i = 0; i < tablesHavePotential.length; i++) { // check tableBookings against tablesHavePotential first lets change the id thing 
//             let z = 0;
//             while (z < tableBookings.length) {
//                 if (tablesHavePotential[i].id === tableBookings[z].fakeId) {
//                     badTables.push(tablesHavePotential[i]);
//                 }
//                 z++;
//             }
//         }
//         if (tablesHavePotential.length !== badTables.length) {
//             return res.status(200).send();
//         }
//         else {
//             const tableBookingsArray = [];
//             for (let i = 0; i < business.c; i++) {
//                 if (tableBookings[i].fakeId == i) {
//                     let test = false;
//                     let placeHolderSpot;
//                     for (let t = 0; t < tableBookingsArray.length; t++) {
//                         if (tableBookingsArray[i][0].fakeId === i) {
//                             test = true;
//                             placeHolderSpot = tableBookingsArray[i];
//                         }
//                     }
//                     if (test) {
//                         placeHolderSpot.push(tableBookings[i])
//                     }
//                     else {
//                         tableBookingsArray.push([tableBookings[i]]);
//                     }
//                 }
//             }
            
//             const timesComingIn = [];
//             for (let i = 0; i < utils.timeDurationStringToInt[req.body.estTime]; i++) {
//                 timesComingIn.push(utils.timeDurationStringToInt[req.body.ft] + i);
//             }
//             let availableTables = [];
//             for (let i = 0; i < tableBookingsArray.length; i++) {
//                 console.log(i);
//                 let isAvailable = true;
//                 for (let t = 0; t < tableBookingsArray[i].length; t++) {
//                     let loopTimeNum = utils.stringToIntTime[tableBookingsArray[i][t].timeStart];
//                     while (loopTimeNum <= utils.stringToIntTime[tableBookingsArray[i][t].timeStart] + utils.timeDurationIntToString[tableBookingsArray[i][t].estDuration]) {
//                         timesComingIn.forEach(function(element) {
//                             if (element === loopTimeNum) {
//                                 isAvailable = false;
//                             }
//                         })
//                         startTimeNum++;
//                     }
                     
//                 }
//                 if (isAvailable) {
//                     availableTables.push(tableBookingsArray[i]);
//                 }
//             }

//             if (availableTables.length === 0) {
//                 res.status(406).send();
//             }
//             else {
//                 let tableString = "";
//                 for (let i = 0; i < availableTables.length; i++) {
//                     if (tableString === "") {
//                         tableString += availableTables[i].fakeId.toString();
//                     }
//                     if (i === availableTables.length - 1) {
//                         tableString += availableTables[i].fakeId.toString();
//                     }
//                     else {
//                         tableString += ` ${availableTables[i].fakeId.toString()}`;
//                     }
//                 }
//                 res.status(200).send({tables: tableString});
//             }
//         }
//     }
//     else {
//         return res.status(406).send();
//     }
// })


// router.post("/sendRequest", userAuth, async (req, res) => {
//     const admin = await Admin.findOne({business: req.body.businessId});
//     const user = await User.findOne({_id: req.body.userId});
//     const date = new Date();
//     const newNoti = new BookedNotification({
//         date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
//         fromId: req.body.userId,
//         fromString: user.fullName,
//         potentialStartTime: req.body.ft,
//         potentialDate: req.body.dateString,
//         type: "UBT",
//         numPeople: req.body.numOfPeople,
//         estDuration:req.body.estTime
//     })
//     const newAdminNotis = [...admin.bookedNotifications];
//     newAdminNotis.push(newNoti);
//     admin.bookedNotifications = newAdminNotis;
//     await newNoti.save();
//     await admin.save();
//     return res.status(200).send();
// })

// router.post("/getExtraInfo", adminAuth, async (req, res) => {
//     const currentDate = new Date();
//     const currentTime = utils.getTime();
//     const selectedDate = new Date(req.body.dateString + ", " + req.body.time);
//     const selectedTime = req.body.time;
//     let check;
//     const checker = utils.compareDates(currentDate.getFullYear(), selectedDate.getFullYear(), currentDate.getMonth(), selectedDate.getMonth(), currentDate.getDate(), selectedDate.getDate());
//     if (checker === "sameDay") {
//         console.log(utils.stringToIntTime[selectedTime], utils.stringToIntTime[currentTime]);
//         if (utils.stringToIntTime[selectedTime] < utils.stringToIntTime[currentTime]) {
//            return res.status(405).send();
//         }
//         else {
//             check = true;
//         }
//     }
//     else if (checker === "futureDay") {
//         check = true;
//     }
//     if (!check) {
//         return res.status(405).send();
//     }
//     const business = await Business.findOne({_id: req.body.businessId});
//     const tablesHavePotential = [];
//     for (let i = 0; i < business.tables.length; i++) {
//         let biggestNum = business.tables[i].height > business.tables[i].width ? business.tables[i].height : business.tables[i].width;
//         console.log(utils.biggestNumConverter[biggestNum]);
//         if (utils.biggestNumConverter[biggestNum] >= Number(req.body.numOfPeople)) {
//             tablesHavePotential.push(business.tables[i]);
//         }
//     }
//     const tableBookings = await TableBooking.find({businessId: business._id, date: req.body.dateString});
//     console.log(tableBookings);
//     if (tablesHavePotential.length > 0) {
//         const badTables = [];
//         for (let i = 0; i < tablesHavePotential.length; i++) { // check tableBookings against tablesHavePotential first lets change the id thing 
//             let z = 0;
//             while (z < tableBookings.length) {
//                 if (tablesHavePotential[i].id === tableBookings[z].fakeId) {
//                     badTables.push(tablesHavePotential[i]);
//                 }
//                 z++;
//             }
//         }
//         if (tablesHavePotential.length !== badTables.length) {
//             return res.status(200).send();
//         } 
//         else {
            
//         }
//     }
//     else {
//         return res.status(406).send();
//     }
// })



// // router.post('/tableStatus', async (req, res) => {
// //     const time
// // })
module.exports = router;