const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const Employee = require('../../models/Employee');
const Business = require('../../models/Business');


router.post('/check', async (req, res) => {
  console.log(req.body.email)
  const admin = await Admin.findOne({ email: req.body.email.toLowerCase() })
  const user = await User.findOne({ email: req.body.email.toLowerCase() })
  const employee = await Employee.findOne({ email: req.body.email.toLowerCase() })
  console.log(admin)
  console.log(user)
  console.log(employee)
  if (!admin && !user && !employee) {
    res.status(200).send();
  }
  else {
    res.status(406).send();
  }
})

router.post('/', async (req, res) => {
    try {
      console.log(req.body);
      if (req.body.monOpen) {
        console.log("RUNNING FROM THE POPO");
        let employee = await Employee.findOne({ email: req.body.email.toLowerCase() });
        let admin = await Admin.findOne({ email: req.body.email.toLowerCase() });
        let user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (admin || user || employee) {
          return res
            .status(400)
            .json({ errors: [{ msg: "That email is being used" }] });
        }
        let schedule = {};
        schedule =
          [{ open: req.body.sunOpen, close: req.body.sunClose },
          { open: req.body.monOpen, close: req.body.monClose },
          { open: req.body.tueOpen, close: req.body.tueClose },
          { open: req.body.wedOpen, close: req.body.wedClose },
          { open: req.body.thuOpen, close: req.body.thuClose },
          { open: req.body.friOpen, close: req.body.friClose },
          { open: req.body.satOpen, close: req.body.satClose }]

       
        let newBusiness;

        if (req.body.typeOfBusiness === "Restaurant") {
          newBusiness = new Business({
            bookingColumnType: req.body.bookingColumnType,
            typeOfBusiness: req.body.typeOfBusiness,
            businessName: req.body.businessName,
            address: req.body.address,
            city: req.body.city,
            zip: req.body.zip,
            state: req.body.state,
            bookingColumnNumber: req.body.bookingColumnNumber,
            schedule: schedule,
            website: req.body.website,
            phoneNumber: req.body.phoneNumber,
            eq: req.body.eq,
            tables: req.body.tables,
            c: req.body.tables.length
          });
        }

        else {
          newBusiness = new Business({
            bookingColumnType: req.body.bookingColumnType,
            typeOfBusiness: req.body.typeOfBusiness,
            businessName: req.body.businessName,
            address: req.body.address,
            city: req.body.city,
            zip: req.body.zip,
            state: req.body.state,
            bookingColumnNumber: req.body.bookingColumnNumber,
            schedule: schedule,
            website: req.body.website,
            phoneNumber: req.body.phoneNumber,
            eq: req.body.eq
          });
        }


        let newAdmin = new Admin({
          businessName: newBusiness.businessName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email.toLowerCase(),
          password: req.body.password,
          business: newBusiness.id
        });

        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(
          req.body.password,
          salt
        );

        const payload = {
          admin: {
            bn: newBusiness.businessName,
            name: `${newAdmin.firstName} ${newAdmin.lastName}`,
            isAdmin: true,
            id: newAdmin.id,
            businessId: newBusiness.id,
            tob: newBusiness.typeOfBusiness
          }
        };

        jwt.sign(
          payload,
          config.get("adminSecret"),
          { expiresIn: 36000000000000 },
          (error, token) => {
            if (error) {
              console.log(error);
            } else {
              console.log("hello")
              res.status(200).json({ token });
            }
          }
        );
        try {
          await newAdmin.save();
          console.log(newBusiness);
          await newBusiness.save();
        } catch (error) {
          console.log(error)
        }
      } else {
        let employee = await Employee.findOne({ email: req.body.adminInfo.email.toLowerCase() });
        let admin = await Admin.findOne({ email: req.body.adminInfo.email.toLowerCase() });
        let user = await User.findOne({ email: req.body.adminInfo.email.toLowerCase() });
        if (admin || user || employee) {
          return res
            .status(400)
            .json({ errors: [{ msg: "That email is being used" }] });
        }
        let newBusiness;
        if (req.body.typeOfBusiness === "Restaurant") {
          newBusiness = new Business({
            bookingColumnType: req.body.bookingColumnType,
            typeOfBusiness: req.body.typeOfBusiness,
            businessName: req.body.businessName,
            address: req.body.businessInfo.address,
            city: req.body.businessInfo.city,
            zip: req.body.businessInfo.zip,
            state: req.body.businessInfo.state,
            bookingColumnNumber: req.body.bookingColumnNumber,
            schedule: req.body.schedule || schedule,
            boxHeight: req.body.boxHeight,
            boxWidth: req.body.boxWidth,
            phoneNumber: req.body.businessInfo.phoneNumber,
            website: req.body.businessInfo.website,
            eq: req.body.eq,
            tables: req.body.tables,
            c: req.body.tables.length 
          });
        }
        else {
          console.log(req.body.businessName, "IM THE BUSINESS NAME");
          newBusiness = new Business({
            bookingColumnType: req.body.bookingColumnType,
            typeOfBusiness: req.body.typeOfBusiness,
            businessName: req.body.businessName,
            address: req.body.businessInfo.address,
            city: req.body.businessInfo.city,
            zip: req.body.businessInfo.zip,
            state: req.body.businessInfo.state,
            bookingColumnNumber: req.body.bookingColumnNumber,
            schedule: req.body.schedule || schedule,
            website: req.body.businessInfo.website,
            phoneNumber: req.body.businessInfo.phoneNumber,
            eq: req.body.eq
          });
        }

    

        let newAdmin = new Admin({
          businessName: newBusiness.businessName,
          firstName: req.body.adminInfo.firstName,
          lastName: req.body.adminInfo.lastName,
          email: req.body.adminInfo.email.toLowerCase(),
          password: req.body.adminInfo.password,
          business: newBusiness.id
        });
        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(
          req.body.adminInfo.password,
          salt
        );

        const payload = {
          admin: {
            bn: newBusiness.businessName,
            name: `${newAdmin.firstName} ${newAdmin.lastName}`,
            isAdmin: true,
            id: newAdmin.id,
            businessId: newBusiness.id,
            tob: newBusiness.typeOfBusiness
          }
        };

        jwt.sign(
          payload,
          config.get("adminSecret"),
          { expiresIn: 36000000000000 },
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
      }
    } catch (error) {
      console.log(error)
      return res.status(500);
    }
  }
);
module.exports = router;
