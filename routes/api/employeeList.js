const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");
const adminAuth = require('../../middleware/authAdmin');
const BusinessProfile = require('../../models/BusinessProfile');
const Business = require('../../models/Business');

// router.post("/employeeSearch", async (req, res) => {
//   try {
//     const employeeFound = await Employee.findOne({ _id: req.body.employeeId });
//     if (employeeFound) {
//       let idAndName = { name: employeeFound.fullName, id: employeeFound._id, profession: employeeFound.profession }
//       let newArray = [];
//       newArray.push(idAndName)
//       res.status(200).json({ employee: newArray })
//     }
//     else {
//       res.status(204).send();
//     }
//   }
//   catch (error) {
//     console.log(error)
//   }
// });

router.post("/", async (req, res) => {
  try {
    const employeeFound = await Employee.findOne({ _id: req.body.employeeId });
    if (employeeFound) {
      console.log(employeeFound)
      let idAndName = { name: employeeFound.fullName, id: employeeFound._id }
      res.status(200).json(idAndName)
    }
    else {
      res.status(204).send();
    }
  }
  catch (error) {
    console.log("ah")
    res.status(406).send();
  }
});


router.get("/", adminAuth, async (req, res) => {
  try {
    console.log(req.admin.businessId);
    const b = await Business.findOne({_id: req.admin.businessId});
    console.log(b);
    const businessProfile = await BusinessProfile.findOne({business: req.admin.businessId});
    console.log(businessProfile);
    const employees = await Employee.find({ _id: businessProfile.employeesWhoAccepted });
    const empls = [];
    if (employees.length) {
      for (let i = 0; i < employees.length; i++) {
        let idAndName = { name: employees[i].fullName, id: employees[i]._id }
          empls.push(idAndName);
      }
      res.status(200).json({empls});
    }
    else {
      res.status(204).send();
    }
  }
  catch (error) {
    console.log("ah")
    console.log(error);
    res.status(406).send();
  }
});

module.exports = router;
