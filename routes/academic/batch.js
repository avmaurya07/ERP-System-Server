const express = require("express");
const cordinator = require("../../models/users/Cordinator");
const batches = require("../../models/academics/batches");
const fetchteacher = require("../../middeleware/fetchteacher");
const fetchuser = require("../../middeleware/fetchuser");
const router = express.Router();
const { addlog } = require("../logs/logs");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");

router.post("/createbatch", fetchteacher, async (req, res) => {
  //to create a batch
  try {
    const dep = await batches.findOne({
      batchcode: req.body.batchcode,
      academicyearcode: req.body.academicyearcode,
      semestercode: req.body.semestercode,
    });
    if (dep) {
      return res
        .status(400)
        .json({ msgtype: false, msg: "Batch already exist" });
    }

    const user = await cordinator.findById(req.teacheruser.id);
    if (req.body.usertype === "cordinator") {
      const newdep = await batches.create({
        academicyearname: req.body.academicyearname,
        academicyearcode: req.body.academicyearcode,
        semestername: req.body.semestername,
        semestercode: req.body.semestercode,
        schoolcode: user.school,
        departmentcode: user.department,
        batchname: req.body.batchname,
        batchcode: req.body.batchcode,
      });
      res.json({ msgtype: true, msg: "Batch Registered" });
      // addlog(
      //   req.adminuser.id,
      //   "admin",
      //   `Department "${req.body.departmentname}" Registered`,
      //   "Main"
      // );
    }

    if (req.body.usertype==="admin"){
      const newdep = await batches.create({
        academicyearname: req.body.academicyearname,
        academicyearcode: req.body.academicyearcode,
        semestername: req.body.semestername,
        semestercode: req.body.semestercode,
        schoolcode: req.body.school,
        departmentcode: req.body.department,
        batchname: req.body.batchname,
        batchcode: req.body.batchcode,
      });
      res.json({ msgtype: true, msg: "Batch Registered" });
      // addlog(
      //   req.adminuser.id,
      //   "admin",
      //   `Department "${req.body.departmentname}" Registered`,
      //   "Main"
      // );
    }
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

router.post("/getbatchlist", fetchuser, async (req, res) => {
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
    if (req.user.usertype==="admin"){
      user = {
        school:req.body.schoolcode,
        department:req.body.departmentcode,
      }
    }
    const semesterlist = await batches
      .find({ schoolcode: user.school, departmentcode: user.department })
      .select("-date")
      .select("-_id")
      .select("-__v");

    res.json({ msgtype: true, msg: "Batch List", batchlist: semesterlist });
    // addlog(
    //   req.user.id,
    //   req.user.usertype,
    //   "List of Departments Accessed",
    //   "Data Access"
    // );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

module.exports = router;
