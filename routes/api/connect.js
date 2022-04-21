const router = require("express").Router();
const userAuth = require("../../middleware/authUser");
const User = require("../../models/User");

router.get("/", userAuth, async (req, res) => {
    console.log(req.user);
    let user = await User.findOne({_id: req.user.id});
    if (user) {
        res.status(200).send();
    } else {
        res.status(201).send();
    }
})


router.post("/search", userAuth, async (req, res) => {
    if (req.body.searchText) {
        let user;
        const searchArray = req.body.searchText.split("");
        for (let i = 0; i < searchArray.length; i++) {
            if (typeof(searchArray[i]) === "number") {
                if (searchArray[i] !== "0" && searchArray[i] !== "1" && searchArray[i] !== "2" && searchArray[i]
                     !== "3" && searchArray[i] !== "4" && searchArray[i] !== "5" && searchArray[i] !== "6"
                     && searchArray[i] !== "7" && searchArray[i] !== "8" && searchArray[i] !== "9") {
                        delete searchArray[i];
                    }
                }
                let realPhone = searchArray.join("");
                user = await User.findOne({ phoneNumber: realPhone }).select(["fullName"]);
                if (user) {
                    res.status(200).json({user});
                }
            }
        }
})



module.exports = router;