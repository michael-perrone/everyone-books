const express = require("express");
const router = express.Router();
const BusinessProfile = require("../../models/BusinessProfile");
const Business = require("../../models/Business");

router.post("/businessSearch", async (req, res) => {
  if (
    req.body.state === "" &&
    req.body.zip === "" &&
    req.body.city === "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness !== ""
  ) {
    let businessesByName = await Business.find({ typeOfBusiness: req.body.typeOfBusiness }).select(['schedule', '_id', 'businessName', 'address', 'state', 'city', 'zip', 'website', 'phoneNumber']);
    if (businessesByName) {
      res.status(200).json({ businessesBack: businessesByName })
    }
    else {
      res.status(406).json({ message: "Your Search did not return any results" })
    }
  }
  else if (req.body.state === "" &&
    req.body.zip === "" &&
    req.body.city === "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessByNameAndType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessByNameAndType) {
      res.status(200).json({ businessesBack: businessByNameAndType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }

  }
  else if (req.body.state === "" &&
    req.body.zip === "" &&
    req.body.city === "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessByNameAndType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessByNameAndType) {
      res.status(200).json({ businessesBack: businessByNameAndType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }

  }
  else if (req.body.state === "" &&
    req.body.zip === "" &&
    req.body.city !== "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness !== "") {
    let businessByCityAndType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city }).select(['schedule', '_id', 'businessName', 'address', 'city', 'state', 'zip', 'website', 'phoneNumber']);
    if (businessByCityAndType) {
      res.status(200).json({ businessesBack: businessByCityAndType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }

  }
  else if (req.body.state === "" &&
    req.body.zip !== "" &&
    req.body.city === "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness !== "") {
    let businessByZipAndType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, zip: req.body.zip }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessByZipAndType) {
      res.status(200).json({ businessesBack: businessByZipAndType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }

  else if (req.body.state !== "" &&
    req.body.zip == "" &&
    req.body.city === "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByStateandType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByStateandType) {
      res.status(200).json({ businessesBack: businessesByStateandType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }

  else if (req.body.state === "" &&
    req.body.zip === "" &&
    req.body.city !== "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByCityNameType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByCityNameType) {
      res.status(200).json({ businessesBack: businessesByCityNameType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }
  else if (req.body.state === "" &&
    req.body.zip !== "" &&
    req.body.city === "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByZipNameType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, zip: req.body.zip, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByZipNameType) {
      res.status(200).json({ businessesBack: businessesByZipNameType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }
  else if (req.body.state !== "" &&
    req.body.zip == "" &&
    req.body.city === "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByStateNameType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByStateNameType) {
      res.status(200).json({ businessesBack: businessesByStateNameType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }

  else if (req.body.state === "" &&
    req.body.zip === "" &&
    req.body.city !== "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByCityNameType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByCityNameType) {
      res.status(200).json({ businessesBack: businessesByCityNameType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }

  else if (req.body.state === "" &&
    req.body.zip !== "" &&
    req.body.city !== "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByCityZipType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, zip: req.body.zip }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByCityZipType) {
      res.status(200).json({ businessesBack: businessesByCityZipType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }
  else if (req.body.state !== "" &&
    req.body.zip === "" &&
    req.body.city !== "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByCityStateType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, state: req.body.state }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByCityStateType) {
      res.status(200).json({ businessesBack: businessesByCityStateType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }

  else if (req.body.state !== "" &&
    req.body.zip !== "" &&
    req.body.city === "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByStateZipType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, zip: req.body.zip }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByStateZipType) {
      res.status(200).json({ businessesBack: businessesByStateZipType })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }
  else if (req.body.state === "" &&
    req.body.zip !== "" &&
    req.body.city !== "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByCityZipTypeName = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, zip: req.body.zip, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByCityZipTypeName) {
      res.status(200).json({ businessesBack: businessesByCityZipTypeName })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }
  else if (req.body.state !== "" &&
    req.body.zip === "" &&
    req.body.city !== "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByCityStateTypeName = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, state: req.body.state, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByCityStateTypeName) {
      res.status(200).json({ businessesBack: businessesByCityStateTypeName })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }
  else if (req.body.state !== "" &&
    req.body.zip !== "" &&
    req.body.city === "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByStateZipTypeName = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, zip: req.body.zip, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByStateZipTypeName) {
      res.status(200).json({ businessesBack: businessesByStateZipTypeName })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }
  else if (req.body.state !== "" &&
    req.body.zip !== "" &&
    req.body.city !== "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByStateZipTypeCity = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, zip: req.body.zip, city: req.body.city }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByStateZipTypeCity) {
      res.status(200).json({ businessesBack: businessesByStateZipTypeCity })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }
  else if (req.body.state !== "" &&
    req.body.zip !== "" &&
    req.body.city !== "" &&
    req.body.businessName !== "" &&
    req.body.typeOfBusiness !== "") {
    let businessesByStateZipTypeCityName = await Business.find({ businessName: req.body.businessName, typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, zip: req.body.zip, city: req.body.city }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber']);
    if (businessesByStateZipTypeCityName) {
      res.status(200).json({ businessesBack: businessesByStateZipTypeCityName })
    }
    else {
      res.status(406).json({ message: "Your search did not return any results" })
    }
  }


  else if (
    req.body.state !== "" &&
    req.body.zip === "" &&
    req.body.city === "" &&
    req.body.businessName === ""
  ) {
    let businessesByState = await Business.find({ state: req.body.state }).select(['schedule', '_id', 'businessName', 'address', 'state', 'city', 'zip', 'website', 'phoneNumber']);
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
      return res.json({ businessesBack: businessesByCity });
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
        .json({ businessesBack: businessesFromZipAndCity });
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
