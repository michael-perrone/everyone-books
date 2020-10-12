const express = require("express");
const Employee = require('../../models/Employee')
const router = express.Router();
const instructorAuth = require("../../middleware/authEmployee");
const Instructor = require("../../models/Instructor");
const Notification = require("../../models/Notification");
const Business = require('../../models/Business');
const Booking = require("../../models/Booking");
const User = require("../../models/User");
const BusinessProfile = require('../../models/BusinessProfile')
const userAuth = require("../../middleware/authUser");
const jwt = require("jsonwebtoken");
const config = require("config");
const employeeAuth = require('../../middleware/authEmployee');
const Admin = require("../../models/Admin");
const authAdmin = require("../../middleware/authAdmin");
const utils = require("../../utils/utils");



router.post("/userBookedEmployee", async (req, res) => {
  try {
    console.log(req.body, 'wingowat')
    let user = await User.findOne({ _id: req.body.userId })
    let booking = await Booking.findOne({ _id: req.body.bookingId });
    let employee = await Employee.findOne({ _id: req.body.employeeId });
    let bookingDateArray = booking.date.split(" ");
    let bookingDate = bookingDateArray.join("-");
    let notificationCreate = new Notification({
      notificationRead: false,
      notificationDate: new Date(),
      employeeId: req.body.employeeId,
      userId: req.body.userId,
      notificationType: "userBookedEmployee",
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
      notificationType: "EmployeeBookedUser",
      notificationMessage: `You have been booked for a ${booking.serviceName} from ${booking.timeStart}-${booking.timeEnd} at ${booking.businessName} by ${employee.fullName}.`,
      notificationDate: new Date(),
      notificationRead: false
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

router.post("/employeenotifications", async (req, res) => {
  console.log("hello")
  try {
    let employee = await Employee.findOne({ _id: req.body.employeeId });
    let notificationArray = [];
    for (let i = 0; i < employee.notifications.length; i++) {
      let notification = await Notification.findOne({
        _id: employee.notifications[i]
      });
      if (notification) {
        notificationArray.push(notification);
      }
    }
    res.status(200).json({ notifications: notificationArray });
  } catch (error) {
    console.log(error);
  }
});

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
  let employee = await Employee.findOne({ _id: req.employee.id }).select(["notifications"]);
  if (employee.notifications.length > 0) {
    res.status(200).json({ notis: true })
  }
  else {
    res.status(200).json({ notis: false })
  }
})


router.get('/getAdminNotis', authAdmin, async (req, res) => {
  let admin = await Admin.findOne({ _id: req.admin.id });
  let notifications = await Notification.find({ _id: admin.notifications });
  return res.status(200).json({ notifications })
})

router.post("/employerDeniedEmployee", authAdmin, async (req, res) => {
  try {
    let notification = await Notification.findOne({ _id: req.body.notificationId });
    notification.answer = false;
    notification.save();
    let business = await Business.findOne({ _id: req.admin.businessId });
    let date = new Date();
    let newNoti = new Notification({
      notificationDate: utils.cutDay(`${date.toDateString()} ${date.getHours}-${date.getMinutes}`),
      fromId: req.admin.businessId,
      fromString: business.businessName,
      notificationType: "EA"
    });
    let employee = await Employee.findOne({ _id: req.body.employeeId });
    let notifications = [...employee.notifications];
    employee.notifications = [...notifications, newNoti];
    await employee.save();
    res.status(200).send();
  } catch (error) {
    console.log(error)
    res.status(500).send();
  }
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
      notification.answer = true;
      await notification.save();
      console.log("DSDSDQSDSQDQSD")
      let business = await Business.findOne({ _id: req.body.businessId })
      let employee = await Employee.findOne({ _id: req.body.employeeId });
      let date = new Date();
      let newNotification = new Notification({
        notificationType: "ERA",
        date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
        fromString: business.businessName
      })
      await newNotification.save();
      employee.businessWorkingAt = business._id;
      let newNotis = [...employee.notifications, newNotification];
      employee.notifications = newNotis;
      await employee.save()
      return res.status(200).send();
    }
    else {
      console.log("did i make it here")
      let oldEmployees = [...businessProfile.employeesWhoAccepted];
      if (oldEmployees.findIndex(e => e == req.body.employeeId) === -1) {
        newEmployees = [...oldEmployees, req.body.employeeId];
        businessProfile.employeesWhoAccepted = newEmployees;
        await businessProfile.save();
        let business = await Business.findOne({ _id: req.body.businessId })
        let employee = await Employee.findOne({ _id: req.body.employeeId });
        let date = new Date();
        let newNotification = new Notification({
          notificationType: "ERA",
          date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
          fromString: business.businessName
        })
        await newNotification.save();
        let newNotis = [...employee.notifications, newNotification];
        employee.notifications = newNotis;
        employee.businessWorkingAt = business._id;
        await employee.save()
        let notification = await Notification.findOne({ _id: req.body.notificationId });
        notification.answer = true;
        await notification.save();
        return res.status(200).send();
      }
      else {
        console.log("here i am")
        return res.status(406).send();
      }
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/employeeSendingId', async (req, res) => {
  let employee = await Employee.findOne({ _id: req.body.employeeId });
  if (employee.idsSent > 1) {
    return res.status(406).send();
  }
  const admin = await Admin.findOne({ business: req.body.businessId });
  if (admin) {
    let notifications = await Notification.find({ _id: admin.notifications })
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].notificationType === "ESID" &&
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

    console.log(req.body.employeeId)
    let date = new Date()
    let newNoti = new Notification({
      notificationType: "ESID",
      date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
      fromId: req.body.employeeId,
      type: "e",
      fromString: name,
    })
    console.log(newNoti)
    await newNoti.save();
    if (newNoti) {
      employee.idsSent += 1;
      employee.save();
    }
    adminNotis.push(newNoti);
    admin.notifications = adminNotis;
    admin.save();
    console.log(admin.notifications)
    res.status(200).send();
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
      return b.notificationDate - a.notificationDate;
    });

    const business = await Business.findOne({
      _id: notification.notificationFromBusiness
    });
    console.log(business)

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
        notificationType: "Club Added Instructor",
        notificationDate: new Date(),
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

module.exports = router;
