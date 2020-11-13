const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Employee = require("../../models/Employee");
const config = require("config");
const Admin = require("../../models/Admin");
const Business = require('../../models/Business');


router.post("/login", async (req, res) => {
  let adminLoggingIn = await Admin.findOne({ email: req.body.email.toLowerCase() });
  let userLoggingIn = await User.findOne({ email: req.body.email.toLowerCase() });
  if (adminLoggingIn) {
    try {
      const passwordsMatching = await bcrypt.compare(
        req.body.password,
        adminLoggingIn.password
      );
      if (passwordsMatching) {
        const business = await Business.findOne({
          _id: adminLoggingIn.business
        });
        const payload = {
          admin: {
            bn: business.businessName,
            businessId: adminLoggingIn.business,
            businessName: business.businessNameAllLower,
            id: adminLoggingIn.id,
            isAdmin: true,
            name: `${adminLoggingIn.firstName} ${adminLoggingIn.lastName}`
          }
        };
        jwt.sign(
          payload,
          config.get("adminSecret"),
          { expiresIn: 366000000000000000000000 },
          (error, token) => {
            res.status(200).json({ token: token, loggingIn: "admin" });
          }
        );
      } else {
        res
          .status(400)
          .json({ error: "Email/Password Combination not recognized" });
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (userLoggingIn) {
    const passwordsMatching = await bcrypt.compare(
      req.body.password,
      userLoggingIn.password
    );
    if (!passwordsMatching) {
      return res
        .status(401)
        .json({ error: "Email/Password Combination not recognized" });
    } else {
      const payload = {
        user: {
          userName: `${userLoggingIn.firstName} ${userLoggingIn.lastName}`,
          isUser: true,
          id: userLoggingIn.id
        }
      };

      jwt.sign(
        payload,
        config.get("userSecret"),
        { expiresIn: 3600000000000000000000000000 },
        (error, token) => {
          if (error) {
            throw error;
          } else {
            res.status(200).json({ token, loggingIn: "user" });
          }
        }
      );
    }
  }
  if (!userLoggingIn && !adminLoggingIn) {
    let employeeLoggingIn = await Employee.findOne({
      email: req.body.email
    });
    if (!employeeLoggingIn) {
      res.status(400).json({
        error: "Email/Password Combination not recognized"
      });
    } else {
      let notiNum = employeeLoggingIn.notifications.count;
      const isPasswordMatching = await bcrypt.compare(
        req.body.password,
        employeeLoggingIn.password
      );

      if (!isPasswordMatching) {
        return res
          .status(400)
          .json({ error: "Email/Password Combination not recognized" });
      }
      const business = await Business.findOne({ _id: employeeLoggingIn.businessWorkingAt });
      const payload = {
        employee: {
          businessId: employeeLoggingIn.businessWorkingAt,
          employeeName: `${employeeLoggingIn.fullName}`,
          id: employeeLoggingIn.id,
          businessName: business ? business.businessName : undefined
        }
      };
      console.log(payload)
      jwt.sign(
        payload,
        config.get("employeeSecret"),
        { expiresIn: 3600000000000000000000000000000 },
        (error, token) => {
          if (error) {
            throw error;
          } else {
            console.log(token)
            res.status(200).json({ token, loggingIn: "employee", notiNum });
          }
        }
      );
    }
  }
});

module.exports = router;
