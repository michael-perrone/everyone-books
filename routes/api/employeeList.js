const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");

router.post("/employeeSearch", async (req, res) => {
  try {
    const employeeFound = await Employee.findOne({ _id: req.body.employeeId });
    if (employeeFound) {
      let idAndName = { name: employeeFound.fullName, id: employeeFound._id, profession: employeeFound.profession }
      let newArray = [];
      newArray.push(idAndName)
      res.status(200).json({ employee: newArray })
    }
    else {
      res.status(204).send();
    }
  }
  catch (error) {
    console.log(error)
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body)
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

module.exports = router;
