const fileUpload = require("../../middleware/file-upload");
const express = require("express");
const router = express.Router();
console.log(fileUpload, "dwdwdawdwd");
console.log(fileUpload.single());

router.post("/", fileUpload.single("image"), (req, res) => {
  console.log("HIT");
  console.log(req.file);
});

module.exports = router;
