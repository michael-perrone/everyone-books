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
const Product = require('../../models/Product');
const utils = require('../../utils/utils');

router.get("/mybusinessForProfile", adminAuth, async (req, res) => {
  try {
    console.log(req.admin)
    let businessProfile = await BusinessProfile.findOne({
      business: req.admin.businessId
    });
    if (businessProfile) {
      let business = await Business.findOne({ _id: req.admin.businessId }).select(["eq"]);
      return res.status(200).json({ profileCreated: true, eq: business.eq });
    }
    if (!businessProfile) {
      let business = await Business.findOne({ _id: req.admin.businessId }).select(["eq"]);
      return res.status(406).json({ profileCreated: false, eq: business.eq });
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
      res.status(200).json({ well: "well" })
    }
  }
  catch (error) {
    console.log(error)
  }
})

router.post('/addproduct', adminAuth, async (req, res) => {
  let price = req.body.price.toString();
  let priceArray = price.split(".");
  console.log(priceArray)
  if (priceArray.length === 1) {
    price = price + ".00"
    console.log(price)
  }
  else {
    if (priceArray[1].length !== 3) {
      console.log(priceArray[1])
      let secondHalfPriceArray = priceArray[1].split("");
      if (secondHalfPriceArray.length === 1) {
        secondHalfPriceArray[1] = "0";
        console.log(secondHalfPriceArray)
        let fixedSecondHalf = secondHalfPriceArray.join("")
        price = priceArray[0] + "." + fixedSecondHalf;
        console.log(price)
      }
    }
  }
  let businessProfile = await BusinessProfile.findOne({
    business: req.admin.businessId
  });
  if (businessProfile) {
    if (businessProfile.products) {
      let newProduct = new Product({
        cost: price,
        name: req.body.name
      });
      businessProfile.products = [...businessProfile.products, newProduct];
      await newProduct.save()
      await businessProfile.save();
      res.status(200).send()
    }
    else {
      let newProduct = new Product({
        cost: price,
        name: req.body.name
      });
      businessProfile.products = [newProduct];
      await newProduct.save();
      await businessProfile.save();
      res.status(200).send()
    }
  }
  else {
    let newProduct = new Product({
      cost: price,
      name: req.body.name
    });
    let newBusinessProfile = new BusinessProfile({
      business: req.admin.businessId,
      products: [newProduct]
    })
    await newProduct.save();
    await newBusinessProfile.save();
    res.status(200).send()
  }
})

router.get("/getProducts", adminAuth, async (req, res) => {
  const businessProfile = await BusinessProfile.findOne({ business: req.admin.businessId });
  if (businessProfile) {
    if (businessProfile.products) {
      let products = await Product.find({ _id: businessProfile.products });
      res.status(200).json({ products });
    }
    else {
      res.status(204).send();
    }
  }
  else {
    res.status(204).send();
  }
})

router.post('/removeProduct', adminAuth, async (req, res) => {
  const businessProfile = await BusinessProfile.findOne({
    business: req.admin.businessId
  });
  console.log(businessProfile.products)
  const currentProducts = await Product.find({ _id: businessProfile.products });
  for (let i = 0; i < currentProducts.length; i++) {
    if (currentProducts[i].name === req.body.name) {
      let newProducts = businessProfile.products.filter(product => {
        return product.toString() !== currentProducts[i]._id.toString()
      })
      console.log(newProducts)
      businessProfile.products = newProducts;
      await businessProfile.save();
      await Product.deleteOne({ _id: currentProducts[i]._id });
    }
  }

  res.status(200).send();
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
    let realEmployees = await Employee.find({ _id: employees.employeesWhoAccepted }).select(["fullName"]);
    console.log(realEmployees);
    res.status(200).send();
  }
  catch (error) {
    console.log(error)
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
    let business = await Business.findOne({ _id: req.admin.businessId });
    const newEmployees = businessProfile.employeesWhoAccepted.filter(
      employee => {
        return employee.toString() !== req.body.employeeId;
      }
    );
    businessProfile.employeesWhoAccepted = newEmployees;
    let employee = await Employee.findOne({
      _id: req.body.employeeId
    });
    let firedNoti = new Notification({
      type: "BRE",
      date: utils.notificationDate,
      fromString: business.businessName
    })
    employee.businessWorkAt = null;
    employee.business = null;
    employee.notifications = [...employee.notifications, firedNoti];
    await firedNoti.save();
    await employee.save();
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
        return employee.toString() !== req.body.employeeId;
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

    let employee = await Employee.findOne({
      _id: req.body.employeeId
    });

    let notificationsToSort = await Notification.find({ _id: employee.notifications });


    for (let i = 0; i < notificationsToSort.length; i++) {
      console.log(notificationsToSort[i])
      if (notificationsToSort[i].type === "BAE" && notificationsToSort[i].fromId.toString() === req.admin.businessId.toString()) {
        console.log(notificationsToSort[i]);
        console.log("WORKED")
        notificationUpHere = notificationsToSort[i];
        await Notification.deleteOne(
          {
            _id: notificationsToSort[i]._id
          },
          function (error) {
            console.log(error);
          }
        );
      }
    }

    console.log(notificationUpHere)
    let newEmployeeNotifications = employee.notifications.filter(
      notification => {
        return notification !== notificationUpHere._id;
      }
    );

    employee.notifications = newEmployeeNotifications;

    await employee.save();



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
    let date = new Date();
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
            sendError = "You can not add the same employee twice.";
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
        let date = new Date();
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
          type: "BAE",
          date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
          notificationFromBusiness: business._id,
          fromId: req.body.business,
          fromString: business.businessName
        });
        employee.notifications.push(newNotification);
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
        type: "BAE",
        date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
        notificationFromBusiness: business._id,
        fromId: req.body.business,
        fromString: business.businessName
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
            type: "BAE",
            date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
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
            type: "BAE",
            date: utils.cutDay(`${date.toDateString()}, ${utils.convertTime(date.getHours(), date.getMinutes())}`),
            notificationFromBusiness: business._id,

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
