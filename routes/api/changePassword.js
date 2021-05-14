const express = require("express");
const router = express.Router();
const authEmployee = require('../../middleware/authEmployee');
const authAdmin = require('../../middleware/authAdmin');
const authUser = require('../../middleware/authUser');
const Employee = require("../../models/Employee");
const bcrypt = require("bcryptjs");


router.post("/employee", authEmployee, async (req, res) => {

    const employee = await Employee.findOne({ _id: req.employee.id });
    let op = employee.password;
    const passwordsMatching = await bcrypt.compare(
        req.body.cp,
        employee.password
    );
    if (passwordsMatching) {
        const salt = await bcrypt.genSalt(10);
        let np = await bcrypt.hash(
            req.body.np,
            salt
        );
        employee.password = np;
        await employee.save();
        console.log(passwordsMatching);
        res.status(200).send();
    }
})

router.post("/admin", authAdmin, async (req, res) => {

})

router.post('/user', authUser, async (req, res) => {

})







module.exports = router;