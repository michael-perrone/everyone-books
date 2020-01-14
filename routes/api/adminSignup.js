const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const TennisClub = require("../../models/TennisClub");
const Admin = require("../../models/Admin");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const Employee = require('../../models/Employee');
const Business = require('../../models/Business');


router.post('/',
  async (req, res) => {
        try {
          console.log(req.body)
          let employee = await Employee.findOne({ email: req.body.adminInfo.email });
          let admin = await Admin.findOne({ email: req.body.adminInfo.email });
          let user = await User.findOne({ email: req.body.adminInfo.email });
          if (admin || user || employee) {
            return res
              .status(400)
              .json({ errors: [{ msg: "That email is being used" }] });
          }

          let newBusiness = new Business({
            businessNameAllLower: req.body.businessName
              .split(" ")
              .reduce((accum, element) => {
                return (accum += element);
              }),
            typeOfBusiness: req.body.typeOfBusiness,
            businessName: req.body.businessName,
            address: req.body.businessInfo.address,
            city: req.body.businessInfo.city,
            zip: req.body.businessInfo.zip,
            state: req.body.businessInfo.state,
            bookingColumnNumber: req.body.bookingColumnNumber,
            schedule: req.body.schedule,
            website: req.body.businessInfo.website,
            phoneNumber: req.body.businessInfo.phoneNumber
          });

          let newAdmin = new Admin({
            businessName: newBusiness.businessNameAllLower,
            firstName: req.body.adminInfo.firstName,
            lastName: req.body.adminInfo.lastName,
            email: req.body.adminInfo.email,
            password: req.body.adminInfo.password,
            business: newBusiness
          });
          const salt = await bcrypt.genSalt(10);
          newAdmin.password = await bcrypt.hash(
            req.body.adminInfo.password,
            salt
          );

          const payload = {
            admin: {
              businessName: newBusiness.businessAllLower,
              name: `${newAdmin.firstName} ${newAdmin.lastName}`,
              isAdmin: true,
              id: newAdmin.id,
              businessId: newBusiness.id
            }
          };

          jwt.sign(
            payload,
            config.get("adminSecret"),
            { expiresIn: 3600000 },
            (error, token) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200).json({ token });
              }
            }
          );
          await newAdmin.save();
          await newBusiness.save();
        } catch (error) {
          console.log(error);
        }
      }
);
module.exports = router;
