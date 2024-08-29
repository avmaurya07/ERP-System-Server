const express = require("express");
const cordinator = require("../../models/users/Cordinator");
const batches = require("../../models/academics/batches");
const classes = require("../../models/academics/classes");
const courses = require("../../models/academics/courses");
const fetchteacher = require("../../middleware/fetchteacher");
const fetchuser = require("../../middleware/fetchuser");
const router = express.Router();
const { addlog } = require("../logs/logs");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");

router.post("/createclass", fetchteacher, async (req, res) => {
  //to create a class
  
    const user = await cordinator.findById(req.teacheruser.id);
    const coursename = await courses.findOne({coursecode:req.body.coursecode});
    const batchname = await batches.findOne({batchcode:req.body.batchcode});
    const teachername = await teacheruser.findOne({empid:req.body.teachercode});
  try {
    const dep = await classes.findOne({
      classcode: `${req.body.teachercode}-(${req.body.coursecode})-(${req.body.academicyearname})-(${req.body.semestername})-${req.body.batchcode}`
    });
    if (dep) {
      return res
        .status(400)
        .json({ msgtype: false, msg: "Class already exist" });
    }

    if (req.body.usertype === "cordinator") {
      const newdep = await classes.create({
        academicyearname: req.body.academicyearname,
        academicyearcode: req.body.academicyearcode,
        semestername: req.body.semestername,
        semestercode: req.body.semestercode,
        schoolcode: user.school,
        departmentcode: user.department,
        batchname: batchname.batchname,
        batchcode: req.body.batchcode,
        classname: `<ul><li>&#9658;${teachername.name}</li><li>&#9658;${coursename.coursename}</li><li>&#9658;${req.body.academicyearname}</li><li>&#9658;${req.body.semestername}</li><li>&#9658;${batchname.batchname}</li></ul>`,
        classcode: `${req.body.teachercode}-(${req.body.coursecode})-(${req.body.academicyearname})-(${req.body.semestername})-${req.body.batchcode}`,
        coursecode: req.body.coursecode,
        coursename: coursename.coursename,
        teachername:teachername.name,
        teachercode:req.body.teachercode,
      });
      return res.json({ msgtype: true, msg: "Class Registered"});
      // addlog(
      //   req.adminuser.id,
      //   "admin",
      //   `Department "${req.body.departmentname}" Registered`,
      //   "Main"
      // );
    }

    if (req.body.usertype === "admin") {
      const newdep = await classes.create({
        academicyearname: req.body.academicyearname,
        academicyearcode: req.body.academicyearcode,
        semestername: req.body.semestername,
        semestercode: req.body.semestercode,
        schoolcode: req.body.schoolcode,
        departmentcode: req.body.departmentcode,
        batchname: batchname.batchname,
        batchcode: req.body.batchcode,
        classname: `<ul><li>&#9658;${teachername.name}</li><li>&#9658;${coursename.coursename}</li><li>&#9658;${req.body.academicyearname}</li><li>&#9658;${req.body.semestername}</li><li>&#9658;${batchname.batchname}</li></ul>`,
        classcode: `${req.body.teachercode}-(${req.body.coursecode})-(${req.body.academicyearname})-(${req.body.semestername})-${req.body.batchcode}`,
        coursecode: req.body.coursecode,
        coursename: coursename.coursename,
        teachername:teachername.name,
        teachercode:req.body.teachercode,
      });
      return res.json({
        msgtype: true,
        msg: "Class Registered"
      });
      // addlog(
      //   req.adminuser.id,
      //   "admin",
      //   `Department "${req.body.departmentname}" Registered`,
      //   "Main"
      // );
    } else {
      return res.json({ msgtype: false, msg: "Not Authorized" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

router.post("/getclasslist", fetchuser, async (req, res) => {
  try {
    let user = [];
    if (req.user.usertype === "cordinator") {
      user = await cordinator.findById(req.user.id);
    }
    if (req.user.usertype === "student") {
      user = await studentuser.findById(req.user.id);
    }
    if (req.user.usertype === "teacher") {
      user = await teacheruser.findById(req.user.id);
    }
    if (req.user.usertype === "admin") {
      user = {
        school: req.body.schoolcode,
        department: req.body.departmentcode,
      };
    }
    const semesterlist = await classes
      .find({
        schoolcode: user.school,
        departmentcode: user.department,
        academicyearcode: req.body.academicyearcode,
        semestercode: req.body.semestercode,
        batchcode: req.body.batchcode,
      })
      .select("-date")
      .select("-_id")
      .select("-__v");
    return res.json({
      msgtype: true,
      msg: "Class List",
      classlist: semesterlist,
    });
    // addlog(
    //   req.user.id,
    //   req.user.usertype,
    //   "List of Departments Accessed",
    //   "Data Access"
    // );
  } catch (error) {
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

module.exports = router;
