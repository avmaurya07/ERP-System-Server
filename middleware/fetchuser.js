var jwt = require("jsonwebtoken");
const adminuser = require("../models/users/AdminUser");
const studentuser = require("../models/users/StudentUser");
const teacheruser = require("../models/users/TeacherUser");
const cordinator = require("../models/users/Cordinator");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = async (req, res, next) => {
  //get the user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Not athorized" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user=data.user;
    if ((await adminuser.findById(req.user.id))){
      req.user.usertype="admin"
    }
    else if ((await studentuser.findById(req.user.id))){
      req.user.usertype="student"
    }
    else if ((await teacheruser.findById(req.user.id))){
      req.user.usertype="teacher"
    }
    else if ((await cordinator.findById(req.user.id))){
      req.user.usertype="cordinator"
    }
    
    next();
  } catch (error) {
    res.status(401).send({ error: "Not athorized" });
  }
};

module.exports = fetchuser;
