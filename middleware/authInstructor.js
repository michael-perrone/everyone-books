const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  try {
    const decodedToken = jwt.verify(token, config.get("employeeSecret"));
    req.employee = decodedToken.employee;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: "Also not authorized" });
  }
};
