const express = require("express");
const adminuser = require("../../models/users/AdminUser");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");
const fetchuser = require("../../middeleware/fetchuser");
const fetchadmin = require("../../middeleware/fetchadmin");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { addlog } = require("../logs/logs");

router.post("/masterlogin", fetchadmin, async (req, res) => {
  try {
    //to login a student

    if (req.body.usertype == "student") {
      const { systemid } = req.body;
     
        //to check user exist or not
        let user = await studentuser.findOne({ systemid });
        //if user does not exist
        if (!user) {
          return res.status(400).json({ msgtype: false, msg: "Invalid User" });
        }
        //for creating a auth token
        const data = {
          user: {
            id: user.id,
          },
        };

        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({
          msgtype: true,
          authtoken,
          msg: "Login Success",
          usertype: "student",
        });
        addlog(user.id, "student", "Admin Login Success", "Login");
        addlog(
          req.adminuser.id,
          "admin",
          `Logined to Student Panal by SystemID: "${systemid}"`,
          "Master"
        );
        return;
    }


    //to login a teacher

    else if (req.body.usertype == "teacher") {
      const { empid } = req.body;
      
        //to check user exist or not
        let user = await teacheruser.findOne({ empid });
        //if user does not exist
        if (!user) {
          return res.status(400).json({ msgtype: false, msg: "Invalid User" });
        }
        //for creating a auth token
        const data = {
          user: {
            id: user.id,
          },
        };

        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({
          msgtype: true,
          authtoken,
          msg: "Login Success",
          usertype: "teacher",
        });
        addlog(user.id, "teacher", "Admin Login Success", "Login");
        addlog(
          req.adminuser.id,
          "admin",
          `Logined to Teacher Panal by EmpID: "${empid}"`,
          "Master"
        );
        return;
    } else {
     return res
        .status(500)
        .json({ msgtype: false, msg: "Internal server error ocurred" });
    }
  } catch (error) {
    res.status(500).json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

module.exports = router;
