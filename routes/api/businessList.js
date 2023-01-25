const express = require("express");
const router = express.Router();
const BusinessProfile = require("../../models/BusinessProfile");
const Business = require("../../models/Business");

router.post("/businessSearch", async (req, res) => {
  let businesses = await Business.find({});
  const state = req.body.state.toLowerCase();
  const zip = req.body.zip;
  const city = req.body.city.toLowerCase();
  const businessName = req.body.businessName.toLowerCase();
  const businessesToPush = [];
  const typeOfBusiness = req.body.typeOfBusiness;
  if (
    req.body.state === "" &&
    req.body.zip === "" &&
    req.body.city === "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness !== ""
      ) {
        let businessesByType = await Business.find({ typeOfBusiness: typeOfBusiness }).select(['schedule', '_id', 'businessName', 'address', 'state', 'city', 'zip', 'website', 'phoneNumber', "eq"]);
            if (businessesByType) {
              return res.status(200).json({ businessesBack: businessesByType })
            }
      }
     else if (
        req.body.state === "" &&
        req.body.zip === "" &&
        req.body.city === "" &&
        req.body.businessName !== "" &&
        req.body.typeOfBusiness === ""
          ) {
            for (let i = 0; i < businesses.length; i++) {
                if (businesses[i].businessName.toLowerCase().includes(businessName)) {
                  businessesToPush.push(businesses[i]);
              }
            }
            if (businessesToPush.length > 0) {
              return res.status(200).json({businessesBack: businessesToPush});
            }
          }
          else if (req.body.state === "" &&
          req.body.zip === "" &&
          req.body.city !== "" &&
          req.body.businessName === "" &&
          req.body.typeOfBusiness === "") {
            for (let i = 0; i < businesses.length; i++) {
              if (businesses[i].city.toLowerCase().includes(city)) {
                businessesToPush.push(businesses[i]);
            }
          }
          if (businessesToPush.length > 0) {
              return res.status(200).json({businessesBack: businessesToPush});
          }
        }
        else if (req.body.state === "" &&
        req.body.zip !== "" &&
        req.body.city === "" &&
        req.body.businessName === "" &&
        req.body.typeOfBusiness === "") {
          for (let i = 0; i < businesses.length; i++) {
            if (businesses[i].zip.includes(zip)) {
              businessesToPush.push(businesses[i]);
          }
        }
        if (businessesToPush.length > 0) {
            return res.status(200).json({businessesBack: businessesToPush});
        }
      }
      else if (req.body.state !== "" &&
      req.body.zip === "" &&
      req.body.city === "" &&
      req.body.businessName === "" &&
      req.body.typeOfBusiness === "") {
        for (let i = 0; i < businesses.length; i++) {
          if (businesses[i].state.toLowerCase().includes(state)) {
            businessesToPush.push(businesses[i]);
        }
      }
      if (businessesToPush.length > 0) {
          return res.status(200).json({businessesBack: businessesToPush});
      }
    }
    else if (req.body.state !== "" &&
    req.body.zip !== "" &&
    req.body.city === "" &&
    req.body.businessName === "" &&
    req.body.typeOfBusiness === "") {
      for (let i = 0; i < businesses.length; i++) {
        if (businesses[i].state.toLowerCase().includes(state) && businesses[i].zip.toLowerCase().includes(zip)) {
          businessesToPush.push(businesses[i]);
      }
    }
    if (businessesToPush.length > 0) {
        return res.status(200).json({businessesBack: businessesToPush});
    }
  }
  else if (req.body.state === "" &&
  req.body.zip !== "" &&
  req.body.city !== "" &&
  req.body.businessName === "" &&
  req.body.typeOfBusiness === "") {
    for (let i = 0; i < businesses.length; i++) {
      if (businesses[i].city.toLowerCase().includes(city) && businesses[i].zip.includes(zip)) {
        businessesToPush.push(businesses[i]);
    }
  }
  if (businessesToPush.length > 0) {
      return res.status(200).json({businessesBack: businessesToPush});
  }
}
else if (req.body.state === "" &&
req.body.zip === "" &&
req.body.city !== "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].city.toLowerCase().includes(city) && businesses[i].businessName.toLowerCase().includes(businessName)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip === "" &&
req.body.city !== "" &&
req.body.businessName === "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].state.toLowerCase().includes(state) && businesses[i].city.toLowerCase().includes(city)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip === "" &&
req.body.city === "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].state.toLowerCase().includes(state) && businesses[i].businessName.toLowerCase().includes(businessName)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state === "" &&
req.body.zip !== "" &&
req.body.city === "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].zip.toLowerCase().includes(zip) && businesses[i].businessName.toLowerCase().includes(businessName)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state === "" &&
req.body.zip !== "" &&
req.body.city === "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].zip.toLowerCase().includes(zip) && businesses[i].businessName.toLowerCase().includes(businessName)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip !== "" &&
req.body.city === "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].zip.toLowerCase().includes(zip) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].state.toLowerCase().includes(state)) {
      businessesToPush.push(businesses[i]);
  }
}
  if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
  }
}
else if (req.body.state !== "" &&
req.body.zip == "" &&
req.body.city !== "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].city.toLowerCase().includes(city) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].state.toLowerCase().includes(state)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip !== "" &&
req.body.city !== "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].city.toLowerCase().includes(city) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].state.toLowerCase().includes(state) && businesses[i].zip.includes(zip)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state === "" &&
req.body.zip !== "" &&
req.body.city !== "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].city.toLowerCase().includes(city) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].zip.includes(zip)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip !== "" &&
req.body.city !== "" &&
req.body.businessName === "" &&
req.body.typeOfBusiness === "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].city.toLowerCase().includes(city) && businesses[i].state.toLowerCase().includes(state) && businesses[i].zip.includes(zip)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
// BREAK

else if (
req.body.state === "" &&
req.body.zip === "" &&
req.body.city === "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness !== ""
  ) {
    for (let i = 0; i < businesses.length; i++) {
        if (businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].typeOfBusiness === typeOfBusiness) {
          businessesToPush.push(businesses[i]);
      }
    }
    if (businessesToPush.length > 0) {
      return res.status(200).json({businessesBack: businessesToPush});
    }
  }
  else if (req.body.state === "" &&
  req.body.zip === "" &&
  req.body.city !== "" &&
  req.body.businessName === "" &&
  req.body.typeOfBusiness !== "") {
    for (let i = 0; i < businesses.length; i++) {
      if (businesses[i].city.toLowerCase().includes(city) && businesses[i].typeOfBusiness === typeOfBusiness) {
        businessesToPush.push(businesses[i]);
    }
  }
  if (businessesToPush.length > 0) {
      return res.status(200).json({businessesBack: businessesToPush});
  }
}
else if (req.body.state === "" &&
req.body.zip !== "" &&
req.body.city === "" &&
req.body.businessName === "" &&
req.body.typeOfBusiness !== "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].zip.includes(zip && businesses[i].typeOfBusiness === typeOfBusiness)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip === "" &&
req.body.city === "" &&
req.body.businessName === "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
  if (businesses[i].state.toLowerCase().includes(state) && businesses[i].typeOfBusiness === typeOfBusiness) {
    businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
  return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip !== "" &&
req.body.city === "" &&
req.body.businessName === "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].state.toLowerCase().includes(state) && businesses[i].zip.toLowerCase().includes(zip) && businesses[i].typeOfBusiness === typeOfBusiness) {
  businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state === "" &&
req.body.zip !== "" &&
req.body.city !== "" &&
req.body.businessName === "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].city.toLowerCase().includes(city) && businesses[i].zip.includes(zip) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state === "" &&
req.body.zip === "" &&
req.body.city !== "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].city.toLowerCase().includes(city) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip === "" &&
req.body.city !== "" &&
req.body.businessName === "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].state.toLowerCase().includes(state) && businesses[i].city.toLowerCase().includes(city) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip === "" &&
req.body.city === "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].state.toLowerCase().includes(state) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state === "" &&
req.body.zip !== "" &&
req.body.city === "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].zip.toLowerCase().includes(zip) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state === "" &&
req.body.zip !== "" &&
req.body.city === "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].zip.toLowerCase().includes(zip) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip !== "" &&
req.body.city === "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].zip.toLowerCase().includes(zip) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].state.toLowerCase().includes(state) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip == "" &&
req.body.city !== "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].city.toLowerCase().includes(city) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].state.toLowerCase().includes(state) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip !== "" &&
req.body.city !== "" &&
req.body.businessName !== "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].city.toLowerCase().includes(city) && businesses[i].businessName.toLowerCase().includes(businessName) && businesses[i].state.toLowerCase().includes(state) && businesses[i].zip.includes(zip) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else if (req.body.state !== "" &&
req.body.zip !== "" &&
req.body.city !== "" &&
req.body.businessName === "" &&
req.body.typeOfBusiness !== "") {
for (let i = 0; i < businesses.length; i++) {
if (businesses[i].city.toLowerCase().includes(city) && businesses[i].state.toLowerCase().includes(state) && businesses[i].zip.includes(zip) && businesses[i].typeOfBusiness === typeOfBusiness) {
businessesToPush.push(businesses[i]);
}
}
if (businessesToPush.length > 0) {
return res.status(200).json({businessesBack: businessesToPush});
}
}
else {
  return res.status(406).send();
}
if (businessesToPush.length === 0) {
  return res.status(406).send();
}

});



router.post('/location', async (req, res) => {
    const businesses = await Business.find({zip: req.body.zip});
    if (businesses.length) {
      res.status(200).json({businessesFromZip: businesses});
    } 
    else {
      const businesses = await Business.find({city: req.body.city, state: req.body.state});
      res.status(200).json({businessesFromCity: businesses});
    }
})

router.post('/location/employeeHiring', async (req, res) => {
  const businesses = await Business.find({zip: req.body.zip}).select(['hi', 'in', 'ur', 'des', 'schedule', '_id', 'businessName', 'address', 'state', 'city', 'zip', 'website', 'phoneNumber']);
  if (businesses.length) {
    res.status(200).json({businessesFromZip: businesses});
  } 
  else {
    const businesses = await Business.find({city: req.body.city, state: req.body.state}).select(['hi', 'in', 'ur', 'des', 'schedule', '_id', 'businessName', 'address', 'state', 'city', 'zip', 'website', 'phoneNumber']);
    res.status(200).json({businessesFromCity: businesses});
  }
})

router.post("/location/portal", async (req, res) => {
  let businesses = await Business.find({});
  const state = req.body.state.toLowerCase();
  const zip = req.body.zip;
  const city = req.body.city.toLowerCase();
  const businessesToPush = [];
          if (req.body.state === "" &&
          req.body.zip === "" &&
          req.body.city !== "") {
            for (let i = 0; i < businesses.length; i++) {
              if (businesses[i].city.toLowerCase().includes(city)) {
                businessesToPush.push(businesses[i]);
            }
          }
          if (businessesToPush.length > 0) {
              return res.status(200).json({businesses: businessesToPush});
          }
        }
        else if (req.body.state === "" &&
        req.body.zip !== "" &&
        req.body.city === "") {
          for (let i = 0; i < businesses.length; i++) {
            if (businesses[i].zip.includes(zip)) {
              businessesToPush.push(businesses[i]);
          }
        }
        if (businessesToPush.length > 0) {
            return res.status(200).json({businesses: businessesToPush});
        }
      }
      else if (req.body.state !== "" &&
      req.body.zip === "" &&
      req.body.city === "") {
        for (let i = 0; i < businesses.length; i++) {
          if (businesses[i].state.toLowerCase().includes(state)) {
            businessesToPush.push(businesses[i]);
        }
      }
      if (businessesToPush.length > 0) {
          return res.status(200).json({businesses: businessesToPush});
      }
    }
    else if (req.body.state !== "" &&
    req.body.zip !== "" &&
    req.body.city === "") {
      for (let i = 0; i < businesses.length; i++) {
        if (businesses[i].state.toLowerCase().includes(state) && businesses[i].zip.toLowerCase().includes(zip)) {
          businessesToPush.push(businesses[i]);
      }
    }
    if (businessesToPush.length > 0) {
        return res.status(200).json({businesses: businessesToPush});
    }
  }
  else if (req.body.state === "" &&
  req.body.zip !== "" &&
  req.body.city !== "") {
    for (let i = 0; i < businesses.length; i++) {
      if (businesses[i].city.toLowerCase().includes(city) && businesses[i].zip.includes(zip)) {
        businessesToPush.push(businesses[i]);
    }
  }
  if (businessesToPush.length > 0) {
      return res.status(200).json({businesses: businessesToPush});
  }
}
else if (req.body.state !== "" &&
req.body.zip === "" &&
req.body.city !== "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].state.toLowerCase().includes(state) && businesses[i].city.toLowerCase().includes(city)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businesses: businessesToPush});
  }
}
else if (req.body.state !== "" &&
req.body.zip !== "" &&
req.body.city !== "") {
  for (let i = 0; i < businesses.length; i++) {
    if (businesses[i].city.toLowerCase().includes(city) && businesses[i].state.toLowerCase().includes(state) && businesses[i].zip.includes(zip)) {
      businessesToPush.push(businesses[i]);
  }
}
if (businessesToPush.length > 0) {
    return res.status(200).json({businesses: businessesToPush});
}
}
// BREAK
else {
  return res.status(406).send();
}
if (businessesToPush.length === 0) {
  return res.status(406).send();
}
});


router.post('/location', async (req, res) => {
    const businesses = await Business.find({zip: req.body.zip});
    if (businesses.length) {
      res.status(200).json({businessesFromZip: businesses});
    } 
    else {
      const businesses = await Business.find({city: req.body.city, state: req.body.state});
      res.status(200).json({businessesFromCity: businesses});
    }
})

router.post('/location/employeeHiring', async (req, res) => {
  const businesses = await Business.find({zip: req.body.zip}).select(['hi', 'in', 'ur', 'des', 'schedule', '_id', 'businessName', 'address', 'state', 'city', 'zip', 'website', 'phoneNumber']);
  if (businesses.length) {
    res.status(200).json({businessesFromZip: businesses});
  } 
  else {
    const businesses = await Business.find({city: req.body.city, state: req.body.state}).select(['hi', 'in', 'ur', 'des', 'schedule', '_id', 'businessName', 'address', 'state', 'city', 'zip', 'website', 'phoneNumber']);
    res.status(200).json({businessesFromCity: businesses});
  }
})

//   if (
//     req.body.state === "" &&
//     req.body.zip === "" &&
//     req.body.city === "" &&
//     req.body.businessName === "" &&
//     req.body.typeOfBusiness !== ""
//   ) {
//     let businessesByType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness }).select(['schedule', '_id', 'businessName', 'address', 'state', 'city', 'zip', 'website', 'phoneNumber', "eq"]);
//     if (businessesByType) {
//       res.status(200).json({ businessesBack: businessesByType })
//     }
//     else {
//       res.status(406).json({ message: "Your Search did not return any results" })
//     }
//   }
//   else if (req.body.state === "" &&
//     req.body.zip === "" &&
//     req.body.city === "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessByNameAndType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessByNameAndType) {
//       res.status(200).json({ businessesBack: businessByNameAndType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }

//   }
//   else if (req.body.state === "" &&
//     req.body.zip === "" &&
//     req.body.city === "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessByNameAndType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessByNameAndType) {
//       res.status(200).json({ businessesBack: businessByNameAndType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }

//   }
//   else if (req.body.state === "" &&
//     req.body.zip === "" &&
//     req.body.city !== "" &&
//     req.body.businessName === "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessByCityAndType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city }).select(['schedule', '_id', 'businessName', 'address', 'city', 'state', 'zip', 'website', 'phoneNumber', "eq"]);
//     if (businessByCityAndType) {
//       res.status(200).json({ businessesBack: businessByCityAndType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }

//   }
//   else if (req.body.state === "" &&
//     req.body.zip !== "" &&
//     req.body.city === "" &&
//     req.body.businessName === "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessByZipAndType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, zip: req.body.zip }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessByZipAndType) {
//       res.status(200).json({ businessesBack: businessByZipAndType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }

//   else if (req.body.state !== "" &&
//     req.body.zip == "" &&
//     req.body.city === "" &&
//     req.body.businessName === "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByStateandType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByStateandType) {
//       res.status(200).json({ businessesBack: businessesByStateandType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }

//   else if (req.body.state === "" &&
//     req.body.zip === "" &&
//     req.body.city !== "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByCityNameType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByCityNameType) {
//       res.status(200).json({ businessesBack: businessesByCityNameType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }
//   else if (req.body.state === "" &&
//     req.body.zip !== "" &&
//     req.body.city === "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByZipNameType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, zip: req.body.zip, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByZipNameType) {
//       res.status(200).json({ businessesBack: businessesByZipNameType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }
//   else if (req.body.state !== "" &&
//     req.body.zip == "" &&
//     req.body.city === "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByStateNameType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByStateNameType) {
//       res.status(200).json({ businessesBack: businessesByStateNameType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }

//   else if (req.body.state === "" &&
//     req.body.zip === "" &&
//     req.body.city !== "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByCityNameType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByCityNameType) {
//       res.status(200).json({ businessesBack: businessesByCityNameType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }

//   else if (req.body.state === "" &&
//     req.body.zip !== "" &&
//     req.body.city !== "" &&
//     req.body.businessName === "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByCityZipType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, zip: req.body.zip }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByCityZipType) {
//       res.status(200).json({ businessesBack: businessesByCityZipType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }
//   else if (req.body.state !== "" &&
//     req.body.zip === "" &&
//     req.body.city !== "" &&
//     req.body.businessName === "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByCityStateType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, state: req.body.state }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByCityStateType) {
//       res.status(200).json({ businessesBack: businessesByCityStateType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }

//   else if (req.body.state !== "" &&
//     req.body.zip !== "" &&
//     req.body.city === "" &&
//     req.body.businessName === "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByStateZipType = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, zip: req.body.zip }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByStateZipType) {
//       res.status(200).json({ businessesBack: businessesByStateZipType })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }
//   else if (req.body.state === "" &&
//     req.body.zip !== "" &&
//     req.body.city !== "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByCityZipTypeName = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, zip: req.body.zip, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByCityZipTypeName) {
//       res.status(200).json({ businessesBack: businessesByCityZipTypeName })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }
//   else if (req.body.state !== "" &&
//     req.body.zip === "" &&
//     req.body.city !== "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByCityStateTypeName = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, city: req.body.city, state: req.body.state, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByCityStateTypeName) {
//       res.status(200).json({ businessesBack: businessesByCityStateTypeName })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }
//   else if (req.body.state !== "" &&
//     req.body.zip !== "" &&
//     req.body.city === "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByStateZipTypeName = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, zip: req.body.zip, businessName: req.body.businessName }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByStateZipTypeName) {
//       res.status(200).json({ businessesBack: businessesByStateZipTypeName })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }
//   else if (req.body.state !== "" &&
//     req.body.zip !== "" &&
//     req.body.city !== "" &&
//     req.body.businessName === "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByStateZipTypeCity = await Business.find({ typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, zip: req.body.zip, city: req.body.city }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByStateZipTypeCity) {
//       res.status(200).json({ businessesBack: businessesByStateZipTypeCity })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }
//   else if (req.body.state !== "" &&
//     req.body.zip !== "" &&
//     req.body.city !== "" &&
//     req.body.businessName !== "" &&
//     req.body.typeOfBusiness !== "") {
//     let businessesByStateZipTypeCityName = await Business.find({ businessName: req.body.businessName, typeOfBusiness: req.body.typeOfBusiness, state: req.body.state, zip: req.body.zip, city: req.body.city }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'state', 'website', 'phoneNumber', "eq"]);
//     if (businessesByStateZipTypeCityName) {
//       res.status(200).json({ businessesBack: businessesByStateZipTypeCityName })
//     }
//     else {
//       res.status(406).json({ message: "Your search did not return any results" })
//     }
//   }


//   else if (
//     req.body.state !== "" &&
//     req.body.zip === "" &&
//     req.body.city === "" &&
//     req.body.businessName === ""
//   ) {
//     let businessesByState = await Business.find({ state: req.body.state }).select(['schedule', '_id', 'businessName', 'address', 'state', 'city', 'zip', 'website', 'phoneNumber', "eq"]);
//     if (businessesByState.length > 0) {
//       return res.json({ businessesBack: businessesByState });
//     } else {
//       let allBusinesses = await Business.find({}).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);
//       let foundFromPartialStateName = [];
//       for (let i = 0; i < allBusinesses.length; i++) {
//         if (allBusinesses[i].state.toLowerCase().includes(req.body.state.toLowerCase())) {
//           foundFromPartialStateName.push(allBusinesses[i]);
//         }
//       }
//       if (foundFromPartialStateName.length > 0) {
//         res
//           .status(200)
//           .json({ businessesBack: foundFromPartialStateName });
//       } else {
//         return res
//           .status(406)
//           .json({ message: "Your search did not return any results." });
//       }
//     }
//   } else if (
//     req.body.state === "" &&
//     req.body.zip !== "" &&
//     req.body.city === "" &&
//     req.body.businessName === ""
//   ) {
//     let businessesByZip = await Business.find({ zip: req.body.zip }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);
//     if (businessesByZip.length > 0) {
//       return res.json({ businessesBack: businessesByZip });
//     } else {
//       return res
//         .status(406)
//         .json({ message: "Your search did not return any results." });
//     }
//   } else if (
//     req.body.state === "" &&
//     req.body.zip === "" &&
//     req.body.city !== "" &&
//     req.body.businessName === ""
//   ) {
//     let businessesByCity = await Business.find({ city: req.body.city }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);
//     if (businessesByCity.length > 0) {
//       return res.json({ businessesBack: businessesByCity });
//     } else {
//       let allBusinesses = await Business.find({}).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);;
//       let businessesThatMatchCity = [];
//       for (let i = 0; i < allBusinesses.length; i++) {
//         if (allBusinesses[i].city.toLowerCase().includes(req.body.city.toLowerCase())) {
//           businessesThatMatchCity.push(allBusinesses[i]);
//         }
//       }
//       if (businessesThatMatchCity.length > 0) {
//         return res.status(200).json({ businessesBack: businessesThatMatchCity });
//       } else {
//         return res
//           .status(406)
//           .json({ message: "Your search did not return any results." });
//       }
//     }
//   } else if (req.body.businessName !== "") {
//     let businessesByBusinessName = await Business.find({
//       businessName: req.body.businessName
//     }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);;
//     if (businessesByBusinessName.length > 0) {
//       return res.json({ businessesBack: businessesByBusinessName });
//     } 
//     else {
//       let allBusinesses = await Business.find({}).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);;
//       let businessesThatMatchCity = [];
//       for (let i = 0; i < allBusinesses.length; i++) {
//         if (allBusinesses[i].city.toLowerCase().includes(req.body.city.toLowerCase())) {
//           businessesThatMatchCity.push(allBusinesses[i]);
//         }
//       }
//       if (businessesThatMatchCity.length > 0) {
//         return res.status(200).json({ businessesBack: businessesThatMatchCity });
//       } else {
//         return res
//           .status(406)
//           .json({ message: "Your search did not return any results." });
//       }
//     }
//     // else {
//     //   return res
//     //     .status(406)
//     //     .json({ message: "Your search did not return any results." });
//     // }
//   } else if (
//     req.body.state !== "" &&
//     req.body.zip !== "" &&
//     req.body.city === ""
//   ) {
//     let businessesFromStateAndZip = await Business.find({
//       state: req.body.state,
//       zip: req.body.zip
//     }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);;
//     if (businessesFromStateAndZip.length > 0) {
//       return res
//         .status(200)
//         .json({ businessesBack: businessesFromStateAndZip });
//     } else {
//       return res
//         .status(406)
//         .json({ message: "Your search did not return any results." });
//     }
//   } else if (
//     req.body.state !== "" &&
//     req.body.zip === "" &&
//     req.body.city !== ""
//   ) {
//     let businessesFromStateAndCity = await Business.find({
//       state: req.body.state,
//       city: req.body.city
//     }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);
//     if (businessesFromStateAndCity.length > 0) {
//       return res
//         .status(200)
//         .json({ businessesBack: businessesFromStateAndCity });
//     } else {
//       return res
//         .status(406)
//         .json({ message: "Your search did not return any results." });
//     }
//   } else if (
//     req.body.state !== "" &&
//     req.body.zip !== "" &&
//     req.body.city !== ""
//   ) {
//     let businessesFromStateAndCityAndZip = await Business.find({
//       state: req.body.state,
//       city: req.body.city,
//       zip: req.body.zip
//     }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);
//     if (businessesFromStateAndCityAndZip.length > 0) {
//       return res
//         .status(200)
//         .json({ businessesBack: businessAndProfileFromStateAndCityAndZip });
//     }
//     else {
//       return res
//         .status(406)
//         .json({ message: "Your search did not return any results." });
//     }
//   } else if (
//     req.body.state === "" &&
//     req.body.zip !== "" &&
//     req.body.city !== ""
//   ) {
//     let businessesFromZipAndCity = await Business.find({
//       zip: req.body.zip,
//       city: req.body.city
//     }).select(['schedule', '_id', 'businessName', 'address', 'city', 'zip', 'website', 'phoneNumber', 'state', "eq"]);
//     if (businessesFromZipAndCity.length > 0) {
//       return res
//         .status(200)
//         .json({ businessesBack: businessesFromZipAndCity });
//     } else {
//       return res
//         .status(406)
//         .json({ message: "Your search did not return any results." });
//     }
//   } else {
//     return res
//       .status(406)
//       .json({ message: "Your search did not return any results." });
//   }
// });

module.exports = router;
