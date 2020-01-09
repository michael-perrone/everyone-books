const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const TennisClub = require("../../models/TennisClub");
const Admin = require("../../models/Admin");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const Instructor = require("../../models/Instructor");
const ClubProfile = require("../../models/ClubProfile");

router.post(
  "/",
  [
    check("tennisClub", "Please enter the club's name you wish to register"),
    check("firstName", "Please enter your first name")
      .not()
      .isEmpty(),
    check("lastName", "Please enter your last name")
      .not()
      .isEmpty(),

    check("email", "Enter a valid Email").isEmail(),
    check(
      "createPassword",
      "Enter a password eight characters or longer"
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req.body.admin);
    if (req.body.admin.createPassword != req.body.admin.passwordConfirm) {
      const passConfirmError = {
        msg: "Password's do not match",
        param: "passwordConfirm",
        location: "body"
      };
      const newErrors = [...errors.array(false), passConfirmError];
      return res.status(400).json({ errors: newErrors });
    } else {
      if (errors.array().length !== 0) {
        return res.status(400).json({ errors: errors.array(false) });
      } else {
        try {
          let employee = await Employee.findOne({ email: req.body.email });
          let admin = await Admin.findOne({ email: req.body.admin.email });
          let user = await User.findOne({ email: req.body.email });
          if (admin || user || instructor) {
            return res
              .status(400)
              .json({ errors: [{ msg: "That email is being used" }] });
          }

          let newTennisClub = new Business({
            businessNameAllLower: req.body.admin.businessName
              .split(" ")
              .reduce((accum, element) => {
                return (accum += element);
              }),
            businessName: req.body.admin.businessName,
            address: req.body.business.address,
            city: req.body.business.city,
            zip: req.body.business.zip,
            state: req.body.business.state,
            numberCourts: req.body.business.numberBookingColumns,
            openTime: req.body.business.openTime,
            closeTime: req.body.business.closeTime,
            website: req.body.business.website,
            phoneNumber: req.body.business.phoneNumber
          });

          let newAdmin = new Admin({
            businessName: newTennisClub.clubNameAllLower,
            firstName: req.body.admin.firstName,
            lastName: req.body.admin.lastName,
            email: req.body.admin.email,
            password: req.body.admin.createPassword,
            business: newBusiness
          });
          const salt = await bcrypt.genSalt(10);
          newAdmin.password = await bcrypt.hash(
            req.body.admin.createPassword,
            salt
          );

          const payload = {
            admin: {
              businessName: newBusiness.businessAllLower,
              name: `${newAdmin.firstName} ${newAdmin.lastName}`,
              isAdmin: true,
              id: newAdmin.id,
              clubId: newBusiness.id
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
          return res.status(200).json({ success: "good shit bro" });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
);
module.exports = router;
