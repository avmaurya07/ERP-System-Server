const express = require("express");
const cordinator = require("../../models/users/Cordinator");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");
const fetchteacher = require("../../middeleware/fetchteacher");
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



router.post("/switchuser", fetchteacher, async (req, res) => {
  try {
    

    


    //switch to cordinator

     if (req.body.usertype == "cordinator") {
      const user1 =await teacheruser.findById(req.teacheruser.id)
        //to check user exist or not
        let user = await cordinator.findOne({ empid:user1.empid });

        if (!user) {
          return res.status(400).json({ msgtype: false, msg: "You are not a Cordinator" });
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
          msg: "Switched to Cordinator",
          usertype: "cordinator",
        });
        // addlog(
        //   req.fetchteacher.id,
        //   "cordinator",
        //   "Login Success",
        //   "Login"
        // );
        return;
    } 
     else if (req.body.usertype == "teacher") {
      const user1 =await cordinator.findById(req.teacheruser.id)
      
        //to check user exist or not
        let user = await teacheruser.findOne({ empid:user1.empid });
        //if user does not exist
        if (!user) {
          return res.status(400).json({ msgtype: false, msg: "You are not a Teacher" });
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
          msg: "Switched to Teacher",
          usertype: "teacher",
        });
        // addlog(
        //   req.teacheruser.id,
        //   "teacher",
        //   "Login Success",
        //   "Login"
        // );
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
