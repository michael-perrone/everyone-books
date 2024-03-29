const express = require("express");
const Employee = require('../../models/Employee')
const router = express.Router();
const employeeAuth = require("../../middleware/authEmployee");
const Instructor = require("../../models/Instructor");
const Notification = require("../../models/Notification");
const Business = require('../../models/Business');
const Booking = require("../../models/Booking");
const User = require("../../models/User");
const BusinessProfile = require('../../models/BusinessProfile')
const userAuth = require("../../middleware/authUser");
const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../../models/Admin");
const authAdmin = require("../../middleware/authAdmin");
const utils = require("../../utils/utils");
const BookedNotification = require("../../models/BookedNotification");
const ServiceType = require("../../models/ServiceType");
const { Server } = require("socket.io");



router.post("/userBookedEmployee", async (req, res) => { // cooked
  try {
    let user = await User.findOne({ _id: req.body.userId })
    let booking = await Booking.findOne({ _id: req.body.bookingId });
    let employee = await Employee.findOne({ _id: req.body.employeeId });
    let bookingDateArray = booking.date.split(" ");
    let bookingDate = bookingDateArray.join("-");
    let notificationCreate = new Notification({
      notificationRead: false,
      date: new Date(),
      employeeId: req.body.employeeId,
      userId: req.body.userId,
      type: "userBookedEmployee",
      notificationMessage: `You have been booked for a ${booking.bookingType} by ${booking.bookedBy} from ${booking.timeStart}-${booking.timeEnd} on ${bookingDate}. You can view this booking in your club's schedule.`
    });
    await notificationCreate.save();
    employee.notifications.unshift(notificationCreate._id);
    await employee.save();
    user.bookings = [...user.bookings, booking];
    await user.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

router.post("/inquire", employeeAuth, async (req, res) => {
  const date = new Date();
  const admin = await Admin.findOne({business: req.body.businessId}).select(["notifications", "business"]);
  const newNoti = new Notification({
    type: "EIB",
    fromString: req.employee.fullName,
    fromId: req.employee.id,
    date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
  })
  admin.notifications.push(newNoti);
  await admin.save();
  await newNoti.save();
  return res.status(200).send();
})

router.post("/inquire/remove", employeeAuth, async (req, res) => {
  const business = await Admin.findOne({business: req.body.businessId});
  const notifications = await Notification.find({type: "EIB", fromId: req.employee.id});
  let businessNotifications = business.notifications;
  for (let i = 0; i < notifications.length; i++) {
    for (let t = 0; t < businessNotifications.length; t++) {
      if (notifications[i]._id === businessNotifications[t]) {
        await Notification.deleteOne({_id: businessNotifications[t]})
        businessNotifications = businessNotifications.splice(t, 1);
        break;
      }
    }
  }
  business.notifications = businessNotifications;
  await business.save();
  return res.status(200).send();
})

router.post('/allReadUser', userAuth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  let notifications = await Notification.find({ _id: user.notifications });
  for (let t = 0; t < notifications.length; t++) {
    notifications[t].notificationRead = true;
    await notifications[t].save();
  }
})

router.post("/employeeBookedCustomer", async (req, res) => {
  try {
    let employee = await Employee.findOne({ _id: req.body.employeeId });
    let booking = await Booking.findOne({ _id: req.body.bookingId });
    let customers = await User.find({ _id: req.body.users });
    let newNotification = new Notification({
      type: "EBU", // cooked come back to this
      
      date: new Date(),
    });

    for (let i = 0; i < customers.length; i++) {
      let customerNotifications = customers[i].notifications;
      customerNotifications.unshift(newNotification);
      customers[i].notifications = customerNotifications;
      await customers[i].save();
    }
    await newNotification.save();

    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});


router.get("/user", userAuth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    let notifications = await Notification.find({ _id: user.notifications });
    if (user.notifications.length) {
      res.status(200).json({ userNotifications: notifications });
    } else {
      res.status(204).json({ userNotifications: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post("/employeeRead", async (req, res) => {
  let notification = await Notification.findOne({ _id: req.body.notificationId });
  notification.answer = true;
  await notification.save();
  res.status(200).send();
})

router.get("/employeenotifications", employeeAuth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.employee.id });
    const notifications = await Notification.find({_id: employee.notifications});
    const bookedNotifications = await BookedNotification.find({_id: employee.bookedNotifications});
    const allNotis = [...notifications, ...bookedNotifications];
    const sortedNotis = allNotis.sort((a,b) => {
    return new Date(a.date) > new Date(b.date);
  })
  const business = await Business.findOne({_id: employee.businessWorkingAt});
  if (!business) {
    return res.status(200).json({notifications: notifications});
  }
  const eq = business.eq;
  if (eq === "n") {
    const bct = business.bookingColumnType;
    const bcn = Number(business.bookingColumnNumber);
    return res.status(200).json({notifications: sortedNotis, eq, bct, bcn});
  }
  return res.status(200).json({ notifications: sortedNotis });
  } catch (error) {
    console.log(error);
  }
});

router.get("/employeeNotificationsHs", employeeAuth, async function(req,res) {
  const employee = await Employee.findOne({ _id: req.employee.id });
  const notifications = await Notification.find({_id: employee.notifications});
  if (notifications.length === 1) {
    if (notifications[0].type === "BAE") {
     return res.status(201).json({notification: notifications[0]});
    }
  }
  else if (notifications.length > 1) {
    let count = 0;
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].type.split("")[notifications[i].type.length - 1] !== "R") {
        count++;
      }
    }
    if (count > 1) {
      return res.status(200).send();
    }
    if (count === 1) {
      let captured;
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].type === "BAE") {
          return res.status(201).json({notification: notifications[i]})
        }
      }
      return res.status(200).send();
    }
  }
  else {
    return res.status(204).send();
  }
})

router.post("/updateread", async (req, res) => {
  if (req.body.notificationIds.length > 0) {
    try {
      for (let i = 0; i < req.body.notificationIds.length; i++) {
        let notification = await Notification.findOne({
          _id: req.body.notificationIds[i]
        });
        notification.notificationRead = true;
        await notification.save();
      }
      res.status(200).send();
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(200).json({ failure: "notificationIds.length was less than 1" });
  }
});


router.get('/employeeHas', employeeAuth, async (req, res) => {
  let employee = await Employee.findOne({ _id: req.employee.id }).select(["businessWorkingAt"]);
  if (employee.businessWorkingAt) {
      return res.status(200).json({hasBusiness: true});
  }
  else {
    return res.status(200).json({ hasBusiness: false })
  }
})

router.get('/getAdminNotis', authAdmin, async (req, res) => {
  const admin = await Admin.findOne({ _id: req.admin.id });
  console.log(admin.notifications)
  const business = await Business.findOne({_id: admin.business}).select(["bookingColumnNumber", "bookingColumnType", "eq"]);
  const notifications = await Notification.find({ _id: admin.notifications });
  const bookedNotifications = await BookedNotification.find({_id: admin.bookedNotifications});
  const allNotis = [...notifications, ...bookedNotifications];
  const sortedNotis = allNotis.sort((a,b) => {
    return new Date(a.date) - new Date(b.date);
  });
  const eq = business.eq;
  if (eq === "n") {
    const bct = business.bookingColumnType;
    const bcn = Number(business.bookingColumnNumber);
    return res.status(200).json({notifications: sortedNotis, eq, bct, bcn});
  }
  return res.status(200).json({ notifications: sortedNotis });
})


router.post("/employerDeniedEmployee", authAdmin, async (req, res) => {
  try {
    let notification = await Notification.findOne({ _id: req.body.notificationId });
    notification.type = "ESIDDR"; // Employee Sent ID Denied Read
    await notification.save();
    let business = await Business.findOne({ _id: req.admin.businessId });
    let date = new Date();
    let newNoti = new Notification({
      date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
      fromId: req.admin.businessId,
      fromString: business.businessName,
      type: "ERDE" // gonna be a pain but fix this now
    });
    let employee = await Employee.findOne({ _id: req.body.employeeId });
    let notifications = [...employee.notifications];
    employee.notifications = [...notifications, newNoti];
    await employee.save();
    res.status(200).json({notification});
  } catch (error) {
    console.log(error)
    res.status(500).send();
  }
})

router.post('/employeeDeniedRequest', employeeAuth, async (req, res) => {
    const date = new Date();
    const notification = await Notification.findOne({_id: req.body.notificationId});
    notification.type = "BAEDR";
    await notification.save();
    const newNoti = new Notification({
      type: "ERN",
      fromString: req.employee.fullName,
      fromId: req.employee.id,
      date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
    })
    const admin = await Admin.findOne({business: notification.fromId}).select(["notifications", "business"]);
    admin.notifications.push(newNoti);
    const bp = await BusinessProfile.findOne({business: admin.business});
    const employeesCopy = [...bp.employeesToSendInvite].filter(e => {
      e._id !== req.employee._id
    });
    bp.employeesToSendInvite = employeesCopy;
    await bp.save();
    await admin.save();
    await newNoti.save();
    res.status(200).send();
})

router.post("/employerAcceptedEmployee", authAdmin, async (req, res) => {
  try {
    let admin = await Admin.findOne({ _id: req.admin.id });
    let businessProfile = await BusinessProfile.findOne({ business: admin.business })
    if (admin.business && !businessProfile) {
      let businessProfile = new BusinessProfile({
        employeesWhoAccepted: [req.body.employeeId],
        business: admin.business
      })
      await businessProfile.save();
      let notification = await Notification.findOne({ _id: req.body.notificationId });
      notification.type = "BRYR";
      await notification.save();
      let business = await Business.findOne({ _id: req.body.businessId })
      let employee = await Employee.findOne({ _id: req.body.employeeId });
      let date = new Date();
      let newNotification = new Notification({
        type: "BAW", 
        date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
        fromString: business.businessName
      })
      await newNotification.save();
      employee.businessWorkingAt = business._id;
      employee.business = business.businessName;
      let newNotis = [...employee.notifications, newNotification];
      employee.notifications = newNotis;
      await employee.save()
      return res.status(200).json({notification});
    }
    else {
      let oldEmployees = [...businessProfile.employeesWhoAccepted];
      if (oldEmployees.findIndex(e => e == req.body.employeeId) === -1) {
        newEmployees = [...oldEmployees, req.body.employeeId];
        businessProfile.employeesWhoAccepted = newEmployees;
        await businessProfile.save();
        let business = await Business.findOne({ _id: req.body.businessId })
        let employee = await Employee.findOne({ _id: req.body.employeeId });
        let date = new Date();
        let newNotification = new Notification({
          type: "BAW",
          date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
          fromString: business.businessName
        })
        await newNotification.save();
        let newNotis = [...employee.notifications, newNotification];
        employee.notifications = newNotis;
        employee.businessWorkingAt = business._id;
        employee.business = business.businessName;
        await employee.save()
        let notification = await Notification.findOne({ _id: req.body.notificationId });
        notification.type = "BRYR";
        await notification.save();
        return res.status(200).json({notification});
      }
      else {
        return res.status(406).send();
      }
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/getUserNotis', userAuth, async (req, res) => {
  const user = await User.findOne({_id: req.user.id}).select(["notifications", "bookedNotifications"]);
  const userNotis = await Notification.find({_id: user.notifications});
  const userBookedNotis = await BookedNotification.find({_id: user.bookedNotifications});
  const allNotis = [...userNotis, ...userBookedNotis];
  allNotis.sort(function(a,b) {;
    return new Date(`${a.date}`) - new Date(`${b.date}`)
  })
  res.status(200).json({allNotis});
})


router.post("/changeAcceptedUserRequestNoti", async (req, res) => {
  let date = new Date();
  let notification = await BookedNotification.findOne({_id: req.body.notiId});
  const user = await User.findOne({_id: notification.fromId}).select(["notifications"]);
  if (req.body.employeeId) {
    const employee = await Employee.findOne({_id: req.body.employeeId}).select(["fullName"]);
    notification.type = "EAUR";
    await notification.save();
    let newNoti = new Notification({
      date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
      fromString: employee._id,
      fromId: employee.fullName,
      type: "YURA"
    })
    let userNotis = [newNoti, ...user.notifications];
    await newNoti.save();
    user.notifications = userNotis;
  }
  else if (req.body.businessId) {
    const business = await Business.findOne({_id: req.body.businessId}).select(["businessName"]);
    notification.type = "AAUR";
    await notification.save();
    let newNoti = new Notification({
       date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
      fromString: business.businessName,
      fromId: business._id,
      type: "YURA"
    })
    let userNotis = [newNoti, ...user.notifications];
    await newNoti.save();
    user.notifications = userNotis;
  }
  await user.save();
  res.status(200).json({notification});
})

router.post("/changeDeniedUserRequestNoti", async (req, res) => {
  let notification = await BookedNotification.findOne({_id: req.body.notiId});
  if (notification.type.split("")[notification.type.length - 1] === "R") {
    const newType = notification.type;
    return res.status(201).json({type: newType})
  }
  notification.type = "ADUR"; // check this was being lazy and didnt make it employee / admin -- just admit
  await notification.save();
  const user = await User.findOne({_id: notification.fromId}).select(["notifications"]);
  if (req.body.employeeId) {
    const employee = await Employee.findOne({_id: req.body.employeeId}).select(["fullName"])
    let newNoti = new Notification({
      date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
      fromString: employee._id,
      fromId: employee.fullName,
      type: "YURD"
    })
    let userNotis = [newNoti, ...user.notifications];
    await user.save();
    await newNoti.save();
    user.notifications = userNotis;
  }
  if (req.body.businessId) {
    const business = await Business.findOne({_id: req.body.businessId}.select("businessName"));
    let newNoti = new Notification({
       date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
      fromString: business.businessName,
      fromId: business._id,
      type: "YURD"
    })
    let userNotis = [newNoti, ...user.notifications];
    user.notifications = userNotis;
    await user.save();
  await newNoti.save();
  }
  
  res.status(200).json({notification});
})

router.post('/employeeSendingId', async (req, res) => {
  let employee = await Employee.findOne({ _id: req.body.employeeId });
  if (employee.idsSent >= 1) {
    return res.status(406).send();
  }
  const admin = await Admin.findOne({ business: req.body.businessId });
  if (admin) {
    let notifications = await Notification.find({ _id: admin.notifications })
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].type === "ESID" &&
        notifications[i].notificationFromEmployee == req.body.employeeId) {
        return res.status(409).send();
      }
    }
    let adminNotis = [...admin.notifications];
    let name = "";
    let employee = await Employee.findOne({ _id: req.body.employeeId });
    if (employee) {
      name = employee.fullName;
    }
    let date = new Date()
    let newNoti = new Notification({
      type: "ESID",
      date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
      fromId: req.body.employeeId,
      fromString: name,
    })
    await newNoti.save();
    if (newNoti) {
      employee.idsSent += 1;
      employee.save();
    }
    adminNotis.push(newNoti);
    admin.notifications = adminNotis;
    await admin.save();
    res.status(200).send();
  }
})

router.post("/getExtraInfo", async (req, res) => {
  try {
    const notification = await BookedNotification.findOne({_id: req.body.notificationId});
    if (notification.type !== req.body.type) {
     return res.status(201).json({type: notification.type});
    }
    const services = await ServiceType.find({_id: notification.ps}).select(["serviceName"]);
    const employee = await Employee.findOne({ _id: notification.potentialEmployee}).select(["fullName"]);
    return res.status(200).json({employee, services})
  }
  catch(error) {
    console.log(error);
    console.log("error");
  }
})

router.post("/changeToRead", async (req, res) => {
  try {
    const notification = await Notification.findOne({_id: req.body.notificationId });
    if (notification) {
      if (notification.type === "ERY") {
        notification.type = "ERYR";
        await notification.save();
        return res.status(200).json({notification});
      }
      else if (notification.type === "EIB") {
        notification.type = "EIBR";
        await notification.save();
        return res.status(200).json({notification});
      }
      else if (notification.type === "BDB") {
        notification.type = "BDBR";
        await notification.save();
        return res.status(200).json({notification});
      }
      else if (notification.type == "BDS") {
        notification.type = "BDSR";
        await notification.save();
        return res.status(200).json({notification});
      }
      else if (notification.type === "BAW") {
        notification.type = "BAWR";
        await notification.save();
        return res.status(200).json({notification});
      }
      else if (notification.type === "ELB") {
        notification.type = "ELBR";
        await notification.save();
        return res.status(200).json({notification});
      }
      else if (notification.type === "BBY") {
        notification.type = "BBYR";
        await notification.save();
        return res.status(200).json({notification});
      }
      else if (notification.type === "YURA") {
         notification.type = "YURAR";
         await notification.save();
         return res.status(200).json({notification});
      }
      else if (notification.type === "ERN") {
        notification.type = "ERNR";
        await notification.save();
        return res.status(200).json({notification});
      }
    }
    else {
      const bookedNoti = await BookedNotification.findOne({_id: req.body.notificationId});
      if (bookedNoti.type === "UATG") { // check this seems problematic
        bookedNoti.type = "UATGR";
        await bookedNoti.save();
        return res.status(200).json({bookedNoti});
      }
      else if (bookedNoti.type === "BBY" || bookedNoti.type === "BBYR") {
        bookedNoti.type = "BBYR";
        await bookedNoti.save();
        return res.status(200).json({bookedNoti});
      }
      else if (bookedNoti.type === "UBT") {
        bookedNoti.type = "UBTR";
        await bookedNoti.save();
        return res.status(200).json({bookedNoti});
      }
    }
  }
  catch (error) {
    console.log(error)
  }
})

router.post("/employeeClickedYesIos", async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.body.employeeId });
    const notification = await Notification.findOne({
      _id: req.body.notificationId
    });
    let date = new Date();
    let business = await Business.findOne({ _id: notification.fromId });
    const businessProfile = await BusinessProfile.findOne({ business: notification.fromId });
    if (businessProfile && employee) {
      employee.businessWorkingAt = notification.fromId;
      employee.business = business.businessName;
      await employee.save();
      let currentPending = [...businessProfile.employeesToSendInvite];
      let newPending = currentPending.filter(cp => cp.toString() !== req.body.employeeId);
      businessProfile.employeesToSendInvite = newPending;
      let currentWorking = [...businessProfile.employeesWhoAccepted];
      currentWorking.push(employee._id);
      businessProfile.employeesWhoAccepted = currentWorking;
      await businessProfile.save();
      notification.type = "BAER";
      await notification.save();
      let newNotification = new Notification({
        fromString: employee.fullName,
        date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
        type: "ERY",
      });
      await newNotification.save();
      const admin = await Admin.findOne({ business: notification.fromId });
      let oldAdminNotis = [...admin.notifications];
      oldAdminNotis.push(newNotification);
      admin.notifications = oldAdminNotis;
      await admin.save();
      return res.status(200).send();
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send();
  }
})



router.post("/employeeclickedyes", async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.body.employeeId });
    let notification = await Notification.findOne({
      _id: req.body.notificationId
    });
    const businessProfile = await BusinessProfile.findOne({
      business: notification.notificationFromBusiness
    }).populate("business", ["businessName"]);
    employee.business = businessProfile.business.businessName;
    employee.businessWorkingAt = businessProfile.business._id;
    await employee.save();

    if (businessProfile && employee) {
      const newEmployeesAfterOneTakenOut = businessProfile.employeesToSendInvite.filter(
        element => {
          return element != req.body.employeeId;
        }
      );
      businessProfile.employeesToSendInvite = newEmployeesAfterOneTakenOut;
      businessProfile.employeesWhoAccepted = [
        ...businessProfile.employeesWhoAccepted,
        employee._id
      ];
      await businessProfile.save();
    }
    notification.answer = "Accepted";
    await notification.save();
    let notifications = await Notification.find({
      _id: employee.notifications
    });
    notifications.sort(function (a, b) {
      return b.date - a.date;
    });

    const business = await Business.findOne({
      _id: notification.notificationFromBusiness
    });

    const payload = {
      employee: {
        businessId: notification.notificationFromBusiness,
        employeeName: req.body.employeeName,
        id: req.body.employeeId,
        businessName: business.businessName
      }
    };
    jwt.sign(
      payload,
      config.get("employeeSecret"),
      { expiresIn: 360000 },
      (error, token) => {
        if (error) {
          throw error;
        } else {
          res.status(200).json({ token, newNotifications: notifications, employee });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

/* router.post("/instructoraddedtoclubnotification", async (req, res) => {
  try {
    const tennisClub = await TennisClub.findById({
      _id: req.body.tennisClubId
    });
    const clubProfile = await ClubProfile.findOne({
      tennisClub: req.body.tennisClubId
    });

    function checkIfInstructorAlreadyInvited() {
      let instructorAlreadyInList = "No Error";

      for (let b = 0; b < req.body.instructors.length; b++) {
        for (let a = 0; a < clubProfile.instructorsToSendInvite.length; a++) {
          if (
            clubProfile.instructorsToSendInvite[a] == req.body.instructors[b]
          ) {
            instructorAlreadyInList =
              "You have already added one or more of these instructors";
            return instructorAlreadyInList;
          }
          for (let c = 0; c < clubProfile.instructorsWhoAccepted.length; c++) {
            if (
              req.body.instructors[b] == clubProfile.instructorsWhoAccepted[c]
            ) {
              instructorAlreadyInList =
                "This instructor is already registed with your club.";
              return instructorAlreadyInList;
            }
          }
        }
      }
      return instructorAlreadyInList;
    }


    if (checkIfInstructorAlreadyInvited() === "No Error") {
      const notification = new Notification({
        type: "Club Added Instructor",
        date: new Date(),
        notificationFromTennisClub: tennisClub._id,
        notificationMessage: `You have been added as an instructor by ${tennisClub.clubName}. If you work here, accept this request and you will now be a registered employee of this Tennis Club.`
      });
      for (let i = 0; i < req.body.instructors.length; i++) {
        const instructor = await Instructor.findById({
          _id: req.body.instructors[i]
        });
        const instructorNotifications = [
          notification,
          ...instructor.notifications
        ];
        instructor.notifications = instructorNotifications;
        await instructor.save();
      }
      await notification.save();
      res.status(200).json({ mike: "all good" });
    }
  } catch (error) {
    console.log(error);
  }
}); */

router.get("/getAdminNotiNumber", authAdmin, async function(req, res) {
    const admin = await Admin.findOne({_id: req.admin.id})
    if (!admin) {
      return res.status(406).send();
    }
    const adminNotis = await Notification.find({_id: admin.notifications});
    const adminBookedNotis = await BookedNotification.find({_id: admin.bookedNotifications});
    const totalNotifications = [...adminBookedNotis, ...adminNotis];
    let num = totalNotifications.length;
    for (let i = 0; i < totalNotifications.length; i++) {
        const lettersArray = totalNotifications[i].type.split("");
        if (lettersArray[lettersArray.length - 1] === "R") {
          num = num - 1;
        }
    }
    res.status(200).json({num});
})

router.post("/checkAdminNotiNumber", authAdmin, async function(req, res) {
  const admin = await Admin.findOne({_id: req.admin.id})
  let adminNotis;
  if (admin) {
    adminNotis = await Notification.find({_id: admin.notifications});
  }
  else {
    return res.status(406).send();
  }
  const adminBookedNotis = await BookedNotification.find({_id: admin.bookedNotifications});
  const totalNotifications = [...adminBookedNotis, ...adminNotis];
  let num = totalNotifications.length;
  for (let i = 0; i < totalNotifications.length; i++) {
      const lettersArray = totalNotifications[i].type.split("");
      if (lettersArray[lettersArray.length - 1] === "R") {
        num = num - 1;
      }
  }
  if (req.body.notiNum !== num) {
    res.status(201).json({num})
  }
  else {
    return res.status(200).send();
  }
})

router.post("/checkUserNotiNumber", userAuth, async function(req, res) {
  const user = await User.findOne({_id: req.user.id})
  const userNotis = await Notification.find({_id: user.notifications});
  const userBookedNotis = await BookedNotification.find({_id: user.bookedNotifications});
  const totalNotifications = [...userBookedNotis, ...userNotis];
  let num = totalNotifications.length;
  for (let i = 0; i < totalNotifications.length; i++) {
      const lettersArray = totalNotifications[i].type.split("");
      if (lettersArray[lettersArray.length - 1] === "R") {
        num = num - 1;
      }
  }
  if (req.body.notiNum !== num) {
    res.status(201).json({num})
  }
  else {
    return res.status(200).send();
  }
})

router.post("/checkEmployeeNotiNumber", employeeAuth, async function(req, res) {
  const employee = await Employee.findOne({_id: req.employee.id})
  const employeeNotis = await Notification.find({_id: employee.notifications});
  const employeeBookedNotis = await BookedNotification.find({_id: employee.bookedNotifications});
  const totalNotifications = [...employeeBookedNotis, ...employeeNotis];
  let num = totalNotifications.length;
  for (let i = 0; i < totalNotifications.length; i++) {
      const lettersArray = totalNotifications[i].type.split("");
      if (lettersArray[lettersArray.length - 1] === "R") {
        num = num - 1;
      }
  }
  if (req.body.notiNum !== num) {
    res.status(201).json({num})
  }
  else {
    return res.status(200).send();
  }
})

router.post("/checkAdminNotis", authAdmin, async function(req, res) {
  const admin = await Admin.findOne({_id: req.admin.id})
  const adminNotis = await Notification.find({_id: admin.notifications});
  const adminBookedNotis = await BookedNotification.find({_id: admin.bookedNotifications});
  const totalNotifications = [...adminBookedNotis, ...adminNotis];
  const newTotals = totalNotifications.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  })
  const unread = [];
  for (let i = 0; i < newTotals.length; i++) {
      const lettersArray = newTotals[i].type.split("");
      if (lettersArray[lettersArray.length - 1] !== "R") {
        unread.push(newTotals[i]);
      }
  }
  console.log(req.body.notiNum, unread.length);
  if (req.body.notiNum < unread.length) {
    const newNotis = [];
      for (let i = 0; i < unread.length - req.body.notiNum; i++) {
        newNotis.push(unread[i]);
      }
      res.status(201).json({newNotis});
  }
  else {
    return res.status(200).send();
  }
})


router.post("/checkEmployeeNotis", employeeAuth, async function(req, res) {

  const employee = await Employee.findOne({_id: req.employee.id})
  const employeeNotis = await Notification.find({_id: employee.notifications});
  const employeeBookedNotis = await BookedNotification.find({_id: employee.bookedNotifications});
  const totalNotifications = [...employeeBookedNotis, ...employeeNotis];
  const newTotals = totalNotifications.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  })
  const unread = [];
  for (let i = 0; i < newTotals.length; i++) {
      const lettersArray = newTotals[i].type.split("");
      if (lettersArray[lettersArray.length - 1] !== "R") {
        unread.push(newTotals[i]);
      }
  }
  if (req.body.notiNum < unread.length) {
    const newNotis = [];
      for (let i = 0; i < unread.length - req.body.notiNum; i++) {
        newNotis.push(unread[i]);
      }
      res.status(201).json({newNotis});
  }
  else {
    return res.status(200).send();
  }
})

router.post("/checkUserNotis", userAuth, async function(req, res) {
  const user = await User.findOne({_id: req.user.id})
  const userNotis = await Notification.find({_id: user.notifications});
  const userBookedNotis = await BookedNotification.find({_id: user.bookedNotifications});
  const totalNotifications = [...userBookedNotis, ...userNotis];
  const newTotals = totalNotifications.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  })
  let num = newTotals.length;
  for (let i = 0; i < newTotals.length; i++) {
      const lettersArray = newTotals[i].type.split("");
      if (lettersArray[lettersArray.length - 1] === "R") {
        num = num - 1;
      }
  }
  if (req.body.notiNum < num) {
    const newNotis = [];
      for (let i = 0; i < num - req.body.notiNum; i++) {
        newNotis.push(newTotals[i]);
      }
      res.status(201).json({newNotis});
  }
  else {
    return res.status(200).send();
  }
})



module.exports = router;
