const express = require("express");
const router = express.Router();
const BusinessProfile = require("../../models/BusinessProfile");
const Business = require("../../models/Business");
const authUser = require("../../middleware/authUser");

router.post("/businessSearch", authUser, async (req, res) => {
  // state
  // zip
  // city
  // state zip
  // state city
  // state zip city
  // city zip
  if (
    req.body.state !== "" &&
    req.body.zip === "" &&
    req.body.city === "" &&
    req.body.businessName === ""
  ) {
    let businessesByState = await Business.find({ state: req.body.state });
    if (businessesByState.length > 0) {
      let businessAndProfileState = [];
      for (let i = 0; i < businessesByState.length; i++) {
        let businessProfileFound = await BusinessProfile.findOne({
          business: businessesByState[i]._id
        });
        if (businessProfileFound) {
          businessAndProfileState.push({
            business: businessesByState[i],
            profile: businessProfileFound
          });
        }
      }
      return res.json({ businessesBack: businessAndProfileState });
    } else {
      let allBusinesses = await Business.find({});
      let foundFromPartialStateName = [];
      for (let i = 0; i < allBusinesses.length; i++) {
        if (allBusinesses[i].state.toLowerCase().includes(req.body.state.toLowerCase())) {
          foundFromPartialStateName.push(allBusinesses[i]);
        }
      }
      if (foundFromPartialStateName.length > 0) {
        let profileAndBusinessFromPartialState = [];
        for (let e = 0; e < foundFromPartialStateName.length; e++) {
          let profile = await BusinessProfile.findOne({
            business: foundFromPartialStateName[e]._id
          });
          profileAndBusinessFromPartialState.push({
            business: foundFromPartialStateName[e],
            profile
          });
        }
        if (profileAndBusinessFromPartialState.length > 0) {
          res
            .status(200)
            .json({ businessesBack: profileAndBusinessFromPartialState });
        }
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
    let businessesByZip = await Business.find({ zip: req.body.zip });
    if (businessesByZip.length > 0) {
      let businessesAndProfileZip = [];
      for (let i = 0; i < businessesByZip.length; i++) {
        let businessProfileFound = await BusinessProfile.findOne({
          business: businessesByZip[i]._id
        });
        if (businessProfileFound) {
          businessesAndProfileZip.push({
            business: businessesByZip[i],
            profile: businessProfileFound
          });
        }
      }
      return res.json({ businessesBack: businessesAndProfileZip });
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
    let businessesByCity = await Business.find({ city: req.body.city });
    if (businessesByCity.length > 0) {
      let businessAndProfileCity = [];
      for (let i = 0; i < businessesByCity.length; i++) {
        let profileFound = await BusinessProfile.findOne({
          business: businessesByCity[i]._id
        });
        if (profileFound) {
          businessAndProfileCity.push({
            business: businessesByCity[i],
            profile: profileFound
          });
        }
      }
      return res.json({ businessesBack: businessAndProfileCity });
    } else {
      let allBusinesses = await Business.find({});
      let businessesThatMatchCity = [];
      for (let i = 0; i < allBusinesses.length; i++) {
        if (allBusinesses[i].city.toLowerCase().includes(req.body.city.toLowerCase())) {
          businessesThatMatchCity.push(allBusinesses[i]);
        }
      }
      if (businessesThatMatchCity.length > 0) {
        let businessesAndProfile = [];
        for (let z = 0; z < businessesThatMatchCity.length; z++) {
          let businessProfileFound = await BusinessProfile.findOne({
            business: businessesThatMatchCity[z]._id
          });
          if (businessProfileFound) {
            businessesAndProfile.push({
              business: businessesThatMatchCity[z],
              profile: businessProfileFound
            });
          }
        }
        if (businessesAndProfile.length > 0) {
          return res.status(200).json({ businessesBack: businessesAndProfile });
        }
      } else {
        return res
          .status(406)
          .json({ message: "Your search did not return any results." });
      }
    }
  } else if (req.body.businessName !== "") {
    let businessesByBusinessName = await Business.find({
      businessName: req.body.businessName
    });
    if (businessesByBusinessName.length > 0) {
      let businessesAndProfileBusinessName = [];
      for (let i = 0; i < businessesByBusinessName.length; i++) {
        let businessProfileFound = await BusinessProfile.findOne({
          business: businessesByBusinessName[i]._id
        });
        if (businessProfileFound) {
          businessesAndProfileBusinessName.push({
            business: businessesByBusinessName[i],
            profile: businessProfileFound
          });
        }
      }
      return res.json({ businessesBack: businessesAndProfileBusinessName });
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
    });
    if (businessesFromStateAndZip.length > 0) {
      let businessAndProfileFromStateAndZip = [];
      for (let i = 0; i < businessesFromStateAndZip.length; i++) {
        let profileFromStateAndZip = await BusinessProfile.findOne({
          business: businessesFromStateAndZip[i]._id
        });
        if (profileFromStateAndZip) {
          businessAndProfileFromStateAndZip.push({
            business: businessesFromStateAndZip[i],
            profile: profileFromStateAndZip
          });
        }
      }
      if (businessAndProfileFromStateAndZip.length > 0) {
        return res
          .status(200)
          .json({ businessesBack: businessAndProfileFromStateAndZip });
      }
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
    });
    if (businessesFromStateAndCity.length > 0) {
      let businessAndProfileFromStateAndCity = [];
      for (let i = 0; i < businessesFromStateAndCity.length; i++) {
        let profileFromStateAndCity = await BusinessProfile.findOne({
          business: businessesFromStateAndCity[i]
        });
        if (profileFromStateAndCity) {
          businessAndProfileFromStateAndCity.push({
            business: businessesFromStateAndCity[i],
            profile: profileFromStateAndCity
          });
        }
      }
      if (businessAndProfileFromStateAndCity.length > 0) {
        return res
          .status(200)
          .json({ businessesBack: businessAndProfileFromStateAndCity });
      }
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
    });
    if (businessesFromStateAndCityAndZip.length > 0) {
      let businessAndProfileFromStateAndCityAndZip = [];
      for (let i = 0; i < businessesFromStateAndCityAndZip.length; i++) {
        let profileFromStateAndCityAndZip = await BusinessProfile.findOne({
          business: businessesFromStateAndCityAndZip[i]
        });
        if (profileFromStateAndCityAndZip) {
          businessAndProfileFromStateAndCityAndZip.push({
            business: businessesFromStateAndCityAndZip[i],
            profile: profileFromStateAndCityAndZip
          });
        }
      }
      if (businessAndProfileFromStateAndCityAndZip.length > 0) {
        return res
          .status(200)
          .json({ businessesBack: businessAndProfileFromStateAndCityAndZip });
      }
    } else {
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
    });
    if (businessesFromZipAndCity.length > 0) {
      let businessAndProfileFromZipAndCity = [];
      for (let i = 0; i < businessesFromZipAndCity.length; i++) {
        let profileFromZipAndCity = await BusinessProfile.findOne({
          business: businessesFromZipAndCity[i]
        });
        if (profileFromZipAndCity) {
          businessAndProfileFromZipAndCity.push({
            business: businessesFromZipAndCity[i],
            profile: profileFromZipAndCity
          });
        }
      }
      if (businessAndProfileFromZipAndCity.length > 0) {
        return res
          .status(200)
          .json({ businessesBack: businessAndProfileFromZipAndCity });
      }
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
