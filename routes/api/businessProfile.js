const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/authAdmin");
const BusinessProfile = require('../../models/BusinessProfile');
const Business = require('../../models/Business');
const Employee = require('../../models/Employee');
const Notification = require("../../models/Notification");
const TennisClub = require("../../models/TennisClub");
const ServiceType = require('../../models/ServiceType');
const { response } = require("express");

router.get("/mybusinessForProfile", adminAuth, async (req, res) => {
  try {
    console.log(req.admin)
    let businessProfile = await BusinessProfile.findOne({
      business: req.admin.businessId
    });
    if (businessProfile) {
      let business = await Business.findOne({ _id: req.admin.businessId });
      let employeesPending = await Employee.find({ _id: businessProfile.employeesToSendInvite }).select(["fullName", "id"]);
      let employeesHere = await Employee.find({ _id: businessProfile.employeesWhoAccepted }).select(["fullName", "id"]);
      return res.status(200).json({ profileCreated: true, business });
    }
    if (!businessProfile) {
      return res.status(406).json({ profileCreated: false });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/myEmployees', adminAuth, async (req, res) => {
  try {
    console.log('HERE')
    let businessProfile = await BusinessProfile.findOne({
      business: req.admin.businessId
    });
    console.log(businessProfile)
    if (businessProfile) {
      let employeesPending = await Employee.find({ _id: businessProfile.employeesToSendInvite }).select(["fullName", "id"]);
      let employeesHere = await Employee.find({ _id: businessProfile.employeesWhoAccepted }).select(["fullName", "id"]);
      console.log(employeesHere);
      console.log(employeesPending)
      res.status(200).json({ employeesPending, employeesHere })
    }
    else {
      res.status(204).send();
    }
  }
  catch (error) {
    console.log(error)
  }
})


router.get("/mybusiness", adminAuth, async (req, res) => {
  try {
    let businessProfile = await BusinessProfile.findOne({
      business: req.admin.businessId
    });
    if (businessProfile) {
      return res.status(200).json({ profileCreated: true });
    }
    if (!businessProfile) {
      return res.status(406).json({ profileCreated: false });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/employeesWorking", async (req, res) => {
  try {
    let employees = await BusinessProfile.findOne({ business: req.body.businessId }).select(["employeesWhoAccepted"]);
    let realEmployees = await Employee.find({ _id: employees.employeesWhoAccepted }).select(["fullName"])
    console.log(realEmployees);
    res.status(200).send();
  }
  catch (error) {

  }
})

router.post("/", adminAuth, async (req, res) => {
  try {

    let businessProfile = await BusinessProfile.findOne({
      business: req.admin.businessId
    });
    let businessProfileFields = {};

    if (req.body.bio) {
      businessProfileFields.bio = req.body.bio;
    }

    businessProfileFields.business = req.admin.businessId;

    if (businessProfile) {
      businessProfile = await BusinessProfile.findOneAndUpdate(
        { business: req.admin.businessId },
        { $set: businessProfileFields },
        { new: true }
      );
      console.log(businessProfile)
      return res.json({
        businessProfile,
        // instructorsForInstantAdd: instructorsBeingCurrentlyAdded
      });

    } else {
      businessProfile = new BusinessProfile(businessProfileFields);
      await businessProfile.save();
      console.log(businessProfile)
      res.status(201).json(businessProfile);

    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/employeeDeleteFromBusiness", adminAuth, async (req, res) => {
  try {
    let businessProfile = await BusinessProfile.findOne({
      business: req.admin.businessId
    });
    const newEmployees = businessProfile.employeesWhoAccepted.filter(
      employee => {
        return !req.body.employees.includes(employee.toString());
      }
    );

    businessProfile.employeesWhoAccepted = newEmployees;

    for (let i = 0; i < req.body.employees.length; i++) {
      let employee = await Employee.findOne({
        _id: req.body.employees[i]
      });
      employee.business = "None";
      await employee.save();
    }
    await businessProfile.save();

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/removeFromPending", adminAuth, async (req, res) => {
  try {
    console.log("hi")
    console.log(req.body.employees)
    let businessProfile = await BusinessProfile.findOne({
      business: req.admin.businessId
    });
    console.log(businessProfile)
    const newEmployees = businessProfile.employeesToSendInvite.filter(
      employee => {
        console.log(employee)
        return !req.body.employees.includes(employee.toString());
      }
    );

    businessProfile.employeesToSendInvite = newEmployees;

    let pendingRemaining = await Employee.find({
      _id: businessProfile.employeesToSendInvite
    });

    let pendingToSendBack = [];

    pendingRemaining.forEach(employee => {
      pendingToSendBack.push({ id: employee._id, name: employee.fullName });
    });

    for (let i = 0; i < req.body.employees.length; i++) {
      let employee = await Employee.findOne({
        _id: req.body.employees[i]
      });
      let notificationUpHere = await Notification.findOne({
        employeeId: req.body.employees[i],
        notificationFromBusiness: req.admin.businessId,
        notificationType: "Business Added Employee"
      });

      let newEmployeeNotifications = employee.notifications.filter(
        notification => {
          return notification !== notificationUpHere._id;
        }
      );

      employee.notifications = newEmployeeNotifications;

      await employee.save();

      await Notification.deleteOne(
        {
          employeeId: req.body.employees[i],
          notificationFromBusiness: req.admin.businessId,
          notificationType: "Business Added Employee"
        },
        function (error) {
          console.log(error);
        }
      );
    }
    await businessProfile.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/getEmployeesPendingAndAccepted", async (req, res) => {
  let employeesPending = await Employee.find({ _id: req.body.pending });
  let pending = [];
  for (let i = 0; i < employeesPending.length; i++) {
    pending.push({
      id: employeesPending[i]._id,
      name: employeesPending[i].fullName
    });
  }
  let employeesAccepted = await Employee.find({ _id: req.body.accepted });
  let accepted = [];
  for (let i = 0; i < employeesAccepted.length; i++) {
    accepted.push({
      id: employeesAccepted[i]._id,
      name: employeesAccepted[i].fullName
    });
  }

  if (accepted.length > 0 || pending.length > 0) {
    res.status(200).json({ accepted, pending });
  }
});

router.post('/addEmployeeToBusinessApp', async (req, res) => {
  try {
    let businessProfile = await BusinessProfile.findOne({
      business: req.body.business
    });
    if (businessProfile) {
      function checkIfDuplicates() {
        let sendError = "No Error";

        for (
          let y = 0;
          y < businessProfile.employeesToSendInvite.length;
          y++
        ) {
          if (
            req.body.employeeId ==
            businessProfile.employeesToSendInvite[y]
          ) {
            sendError = "You can not add the same instructor twice.";
            return sendError;
          }
        }
        for (
          let z = 0;
          z < businessProfile.employeesWhoAccepted.length;
          z++
        ) {
          if (
            req.body.employeeId ==
            businessProfile.employeesWhoAccepted[z]
          ) {
            sendError =
              "One of these instructors is already registered at your club.";
            return sendError;
          }
        }
        return sendError;
      }
      if (checkIfDuplicates() === "No Error") {
        let business = await Business.findOne({
          _id: req.body.business
        });
        let employeesForInstantAdd = [];
        businessProfile.employeesToSendInvite.push(req.body.employeeId);
        businessProfile.save();
        let employee = await Employee.findOne({
          _id: req.body.employeeId
        });
        employeesForInstantAdd.push(employee);
        employee.requestFrom = req.body.business;
        employee.requestPending = true;

        let newNotification = new Notification({
          employeeId: employee._id,
          notificationType: "Business Added Employee",
          notificationDate: new Date(),
          notificationFromBusiness: business._id,
          notificationMessage: `You have been added as an employee by ${business.businessName}. If you work here, accept this request and you will now be a registered employee of this Business.`
        });
        employee.notifications.unshift(newNotification);
        await newNotification.save();
        await employee.save();
        res.status(200).send();
      } else {
        res.status(406).json({ error: checkIfDuplicates() });
      }
    } else {
      let business = await Business.findOne({
        _id: req.body.business
      });
      let businessProfile = new BusinessProfile({
        employeesToSendInvite: req.body.employeeId,
        business: req.body.business
      });
      await businessProfile.save();
      let employeesForInstantAdd = [];
      let employeeForInstant = await Employee.findOne({
        _id: req.body.employeeId
      });
      employeesForInstantAdd.push(employeeForInstant);
      let newNotification = new Notification({
        employeeId: employeeForInstant._id,
        notificationType: "Business Added Employee",
        notificationDate: new Date(),
        notificationFromBusiness: business._id,
        notificationMessage: `You have been added as an Employee by ${business.businessName}. If you work here, accept this request and you will now be a registered employee of this Tennis Business.`
      });
      employeeForInstant.notifications.unshift(newNotification);
      await newNotification.save();
      await employeeForInstant.save();
      res.status(200).json({
        businessProfile,
        employeesForInstantAdd
      });
    }
  } catch (error) {
    console.log(error);
  }
});


router.post("/addEmployeeToBusiness", async (req, res) => {
  console.log(req.body)
  try {
    let businessProfile = await BusinessProfile.findOne({
      business: req.body.business
    });
    if (businessProfile) {
      function checkIfDuplicates() {
        let sendError = "No Error";
        for (let x = 0; x < req.body.employees.length; x++) {
          for (
            let y = 0;
            y < businessProfile.employeesToSendInvite.length;
            y++
          ) {
            if (
              req.body.employees[x] ==
              businessProfile.employeesToSendInvite[y]
            ) {
              sendError = "You can not add the same instructor twice.";
              return sendError;
            }
          }

          for (
            let z = 0;
            z < businessProfile.employeesWhoAccepted.length;
            z++
          ) {
            if (
              req.body.employees[x] ==
              businessProfile.employeesWhoAccepted[z]
            ) {
              sendError =
                "One of these instructors is already registered at your club.";
              return sendError;
            }
          }
        }
        return sendError;
      }
      if (checkIfDuplicates() === "No Error") {
        let business = await Business.findOne({
          _id: req.body.business
        });
        let employeesForInstantAdd = [];
        businessProfile.employeesToSendInvite.push(...req.body.employees);
        businessProfile.save();
        for (let z = 0; z < req.body.employees.length; z++) {
          let employee = await Employee.findOne({
            _id: req.body.employees[z]
          });
          employeesForInstantAdd.push(employee);
          employee.requestFrom = req.body.business;
          employee.requestPending = true;

          let newNotification = new Notification({
            employeeId: employee._id,
            notificationType: "Business Added Employee",
            notificationDate: new Date(),
            notificationFromBusiness: business._id,
            notificationMessage: `You have been added as an employee by ${business.businessName}. If you work here, accept this request and you will now be a registered employee of this Business.`
          });
          employee.notifications.unshift(newNotification);
          await newNotification.save();
          await employee.save();
        }
        res.status(200).json({
          businessProfile,
          employeesForInstantAdd
        });
      } else {
        res.status(406).json({ error: checkIfDuplicates() });
      }
    } else {
      if (req.body.employees.length > 0) {
        let business = await Business.findOne({
          _id: req.body.business
        });
        let businessProfile = new BusinessProfile({
          employeesToSendInvite: req.body.employees,
          business: req.body.business
        });
        await businessProfile.save();
        let employeesForInstantAdd = [];
        for (let f = 0; f < req.body.employees.length; f++) {
          let employeeForInstant = await Employee.findOne({
            _id: req.body.employees[f]
          });
          employeesForInstantAdd.push(employeeForInstant);
          let newNotification = new Notification({
            employeeId: employeeForInstant._id,
            notificationType: "Business Added Employee",
            notificationDate: new Date(),
            notificationFromBusiness: business._id,
            notificationMessage: `You have been added as an Employee by ${business.businessName}. If you work here, accept this request and you will now be a registered employee of this Tennis Business.`
          });
          employeeForInstant.notifications.unshift(newNotification);
          await newNotification.save();
          await employeeForInstant.save();
        }
        res.status(200).json({
          businessProfile,
          employeesForInstantAdd
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
