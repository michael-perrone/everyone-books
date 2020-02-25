const express = require("express");
const Employee = require('../../models/Employee')
const router = express.Router();
const instructorAuth = require("../../middleware/authInstructor");
const Instructor = require("../../models/Instructor");
const Notification = require("../../models/Notification");
const Business = require('../../models/Business');
const Booking = require("../../models/Booking");
const User = require("../../models/User");
const BusinessProfile = require('../../models/BusinessProfile')
const userAuth = require("../../middleware/authUser");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/userBookedEmployee", async (req, res) => {
  try {
    console.log(req.body, 'wingowat')
    let user = await User.findOne({_id: req.body.userId})
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
  let user = await User.findOne({_id: req.user._id});
  let notifications = await Notification.find({_id: user.notifications});
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

router.get("/employeenotifications", instructorAuth, async (req, res) => {
  try {
    let employee = await Employee.findOne({ _id: req.employee.id });
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
    notifications.sort(function(a, b) {
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
