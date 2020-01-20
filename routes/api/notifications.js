const express = require("express");
const Employee = require('../../models/Employee')
const router = express.Router();
const instructorAuth = require("../../middleware/authInstructor");
const Instructor = require("../../models/Instructor");
const Notification = require("../../models/Notification");
const Business = require('../../models/Business');
const CourtBooked = require("../../models/CourtBooked");
const User = require("../../models/User");
const BusinessProfile = require('../../models/BusinessProfile')
const userAuth = require("../../middleware/authUser");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/userBookedInstructor", async (req, res) => {
  try {
    let booking = await CourtBooked.findOne({ _id: req.body.bookingId });
    let instructor = await Instructor.findOne({ _id: req.body.instructorId });
    let bookingDateArray = booking.date.split(" ");
    let bookingDate = bookingDateArray.join("-");
    let notificationCreate = new Notification({
      notificationRead: false,
      notificationDate: new Date(),
      instructorId: req.body.instructorId,
      userId: req.body.userId,
      notificationType: "instructorBookedUser",
      notificationMessage: `You have been booked for a ${booking.bookingType} by ${booking.bookedBy} from ${booking.timeStart}-${booking.timeEnd} on ${bookingDate}. You can view this booking in your club's schedule.`
    });
    notificationCreate.save();
    instructor.notifications.unshift(notificationCreate._id);
    instructor.save();
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

router.post("/instructorBookedUser", async (req, res) => {
  try {
    let instructor = await Instructor.findOne({ _id: req.body.instructorId });
    let booking = await CourtBooked.findOne({ _id: req.body.bookingId });
    let players = await User.find({ _id: req.body.users });
    let newNotification = new Notification({
      notificationType: "InstructorBookedUser",
      notificationMessage: `You have been added to a ${booking.bookingType} from ${booking.timeStart}-${booking.timeEnd} at ${booking.clubName} by ${instructor.fullName}.`,
      notificationDate: new Date(),
      notificationRead: false
    });

    for (let i = 0; i < players.length; i++) {
      let playerNotifications = players[i].notifications;
      playerNotifications.unshift(newNotification);
      players[i].notifications = playerNotifications;
      await players[i].save();
    }
    await newNotification.save();

    res.status(204).send();
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
