const express = require("express");
const adminuser = require("../../models/users/AdminUser");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");
const fetchuser = require("../../middeleware/fetchuser");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const salt = process.env.salt;
const { addlog} = require('../logs/logs');

router.put("/changepassword", fetchuser, async (req, res) => {
  //to change password
  try {
    if (req.body.usertype == "admin") {
      let user = await adminuser.findOne({_id:req.user.id });
      if (!user) {
        return res
          .status(401)
          .json({ msgtype: false, msg: "Unathorized Access" });
      }
      //to compare entered password with the database
      const passwordCompare = await bcrypt.compare(req.body.password, user.password);
      //if password is wrong
      if (!passwordCompare) {
        return res.status(400).json({msgtype:false, msg: "Wrong Password" });
      }
      //salting
      const secPass = await bcrypt.hash(req.body.newpassword, salt);
      // to create the user

      user = await adminuser.findByIdAndUpdate(req.user.id,{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: secPass,
      });
      //for creating a auth token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ msgtype: true, authtoken, msg: "Password Changed" });
      addlog(user.id,"admin","Password Changed","Passwordchange")
    }





    if (req.body.usertype == "student") {
      let user = await studentuser.findOne({_id:req.user.id });
      if (!user) {
        return res
          .status(401)
          .json({ msgtype: false, msg: "Unathorized Access" });
      }
      //to compare entered password with the database
      const passwordCompare = await bcrypt.compare(req.body.password, user.password);
      //if password is wrong
      if (!passwordCompare) {
        return res.status(400).json({msgtype:false, msg: "Wrong Password" });
      }
      //salting
      const secPass = await bcrypt.hash(req.body.newpassword, salt);
      // to create the user

      user = await studentuser.findByIdAndUpdate(req.user.id,{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: secPass,
      });
      //for creating a auth token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ msgtype: true, authtoken, msg: "Password Changed" });
      
      addlog(user.id,"student","Password Changed","Passwordchange")
    }







    if (req.body.usertype == "teacher") {
      let user = await teacheruser.findOne({_id:req.user.id });
      if (!user) {
        return res
          .status(401)
          .json({ msgtype: false, msg: "Unathorized Access" });
      }
      //to compare entered password with the database
      const passwordCompare = await bcrypt.compare(req.body.password, user.password);
      //if password is wrong
      if (!passwordCompare) {
        return res.status(400).json({msgtype:false, msg: "Wrong Password" });
      }
      //salting
      const secPass = await bcrypt.hash(req.body.newpassword, salt);
      // to create the user

      user = await teacheruser.findByIdAndUpdate(req.user.id,{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: secPass,
      });
      //for creating a auth token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ msgtype: true, authtoken, msg: "Password Changed" });
      addlog(user.id,"teacher","Password Changed","Passwordchange")
    }
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }


 
});

module.exports = router;
