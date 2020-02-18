const express = require("express");
const router = express.Router();
const BusinessProfile = require("../../models/BusinessProfile");
const Business = require("../../models/Business");
const authUser = require("../../middleware/authUser");

router.post("/businessSearch", authUser, async (req, res) => {
  if (
    req.body.state !== "" &&
    req.body.zip === "" &&
    req.body.city === "" &&
    req.body.businessName === ""
  ) {
    let businessesByState = await Business.find({ state: req.body.state }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber']);
    if (businessesByState.length > 0) {
      return res.json({ businessesBack: businessesByState });
    } else {
      let allBusinesses = await Business.find({}).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state']);
      let foundFromPartialStateName = [];
      for (let i = 0; i < allBusinesses.length; i++) {
        if (allBusinesses[i].state.toLowerCase().includes(req.body.state.toLowerCase())) {
          foundFromPartialStateName.push(allBusinesses[i]);
        }
      }
      if (foundFromPartialStateName.length > 0) {
          res
            .status(200)
            .json({ businessesBack: foundFromPartialStateName });
      } else {
        return res
          .status(406)
          .json({ message: "Your search did not return any results." });
      }
    }
  } else if (
    req.body.state === "" &&
    req.body.zip !== "" &&
    req.body.city === "" &&
    req.body.businessName === ""
  ) {
    let businessesByZip = await Business.find({ zip: req.body.zip }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state']);
    if (businessesByZip.length > 0) {
      return res.json({ businessesBack: businessesByZip });
    } else {
      return res
        .status(406)
        .json({ message: "Your search did not return any results." });
    }
  } else if (
    req.body.state === "" &&
    req.body.zip === "" &&
    req.body.city !== "" &&
    req.body.businessName === ""
  ) {
    let businessesByCity = await Business.find({ city: req.body.city }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state']);
    if (businessesByCity.length > 0) {
      return res.json({ businessesBack: businessAndProfileCity });
    } else {
      let allBusinesses = await Business.find({}).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state']);;
      let businessesThatMatchCity = [];
      for (let i = 0; i < allBusinesses.length; i++) {
        if (allBusinesses[i].city.toLowerCase().includes(req.body.city.toLowerCase())) {
          businessesThatMatchCity.push(allBusinesses[i]);
        }
      }
      if (businessesThatMatchCity.length > 0) {
          return res.status(200).json({ businessesBack: businessesThatMatchCity });
      } else {
        return res
          .status(406)
          .json({ message: "Your search did not return any results." });
      }
    }
  } else if (req.body.businessName !== "") {
    let businessesByBusinessName = await Business.find({
      businessName: req.body.businessName
    }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state']);;
    if (businessesByBusinessName.length > 0) {
      return res.json({ businessesBack: businessesByBusinessName });
    } else {
      return res
        .status(406)
        .json({ message: "Your search did not return any results." });
    }
  } else if (
    req.body.state !== "" &&
    req.body.zip !== "" &&
    req.body.city === ""
  ) {
    let businessesFromStateAndZip = await Business.find({
      state: req.body.state,
      zip: req.body.zip
    }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state']);;
    if (businessesFromStateAndZip.length > 0) {
        return res
          .status(200)
          .json({ businessesBack: businessesFromStateAndZip });
    } else {
      return res
        .status(406)
        .json({ message: "Your search did not return any results." });
    }
  } else if (
    req.body.state !== "" &&
    req.body.zip === "" &&
    req.body.city !== ""
  ) {
    let businessesFromStateAndCity = await Business.find({
      state: req.body.state,
      city: req.body.city
    }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state']);
    if (businessesFromStateAndCity.length > 0) {
        return res
          .status(200)
          .json({ businessesBack: businessesFromStateAndCity });
    } else {
      return res
        .status(406)
        .json({ message: "Your search did not return any results." });
    }
  } else if (
    req.body.state !== "" &&
    req.body.zip !== "" &&
    req.body.city !== ""
  ) {
    let businessesFromStateAndCityAndZip = await Business.find({
      state: req.body.state,
      city: req.body.city,
      zip: req.body.zip
    }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state']);
    if (businessesFromStateAndCityAndZip.length > 0) {
        return res
          .status(200)
          .json({ businessesBack: businessAndProfileFromStateAndCityAndZip });
      }
      else {
      return res
        .status(406)
        .json({ message: "Your search did not return any results." });
    }
  } else if (
    req.body.state === "" &&
    req.body.zip !== "" &&
    req.body.city !== ""
  ) {
    let businessesFromZipAndCity = await Business.find({
      zip: req.body.zip,
      city: req.body.city
    }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state']);
    if (businessesFromZipAndCity.length > 0) {
        return res
          .status(200)
          .json({ businessesBack: businessAndProfileFromZipAndCity });
    } else {
      return res
        .status(406)
        .json({ message: "Your search did not return any results." });
    }
  } else {
    return res
      .status(406)
      .json({ message: "Your search did not return any results." });
  }
});

module.exports = router;
