const express = require("express");
const adminuser = require("../../models/users/AdminUser");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");
const cordinator = require("../../models/users/Cordinator");
const fetchadmin = require("../../middeleware/fetchadmin");
const router = express.Router();
const { addlog} = require('../logs/logs');

router.post("/userlist", fetchadmin, async (req, res) => {



  try {
    if (req.body.usertype == "admin") {

      const userlist = await adminuser.find()
        .select("-password")
        .select("-date")
        .select("-_id")
        .select("-__v");

      res.json({ msgtype: true, msg: "Admin User List",userlist});
      addlog(req.adminuser.id,"admin","List of Admins Accessed","Data Access")
    }



    if (req.body.usertype == "student") {

      const userlist = await studentuser.find()
        .select("-password")
        .select("-date")
        .select("-_id")
        .select("-__v");

      res.json({ msgtype: true, msg: "Student User List",userlist});
      addlog(req.adminuser.id,"admin","List of Students Accessed","Data Access")
    }




    if (req.body.usertype == "teacher") {

      const userlist = await teacheruser.find()
        .select("-password")
        .select("-date")
        .select("-_id")
        .select("-__v");

      res.json({ msgtype: true, msg: "Teacher User List",userlist});
      addlog(req.adminuser.id,"admin","List of Teachers Accessed","Data Access")
    }


    if (req.body.usertype == "cordinator") {

      const userlist = await cordinator.find()
        .select("-date")
        .select("-_id")
        .select("-__v");

      res.json({ msgtype: true, msg: "Cordinator User List",userlist});
      addlog(req.adminuser.id,"admin","List of Cordinators Accessed","Data Access")
    }
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

module.exports = router;
