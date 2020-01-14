const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");

router.post("/employeeSearch", async (req, res) => {
  try {
    const employeeFound = await Employee.findOne({_id: req.body.employeeId});
    if (employeeFound) {
      res.status(200).json({employeeFound})
    }
    else {
      res.status(204).send();
    }
  }
  catch(error) {
    console.log(error)
  }


});

module.exports = router;
