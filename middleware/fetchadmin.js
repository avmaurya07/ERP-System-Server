var jwt = require("jsonwebtoken");
const adminuser = require("../models/users/AdminUser");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchadmin = async (req, res, next) => {
  //get the user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msgtype:false,msg: "Not athorized" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.adminuser=data.user;

    if (!(await adminuser.findById(req.adminuser.id))){
      return res.status(401).json({ msgtype:false,msg: "Not athorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ msgtype:false,msg: "Not athorized" });
  }
};

module.exports = fetchadmin;
