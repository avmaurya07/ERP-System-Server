const express = require("express");
const semester = require("../../models/academics/semester");
const fetchadmin = require("../../middeleware/fetchadmin");
const fetchuser = require("../../middeleware/fetchuser");
const router = express.Router();
const { addlog } = require("../logs/logs");
const Department = require("../../models/main/Department");

router.post("/createsemester", fetchadmin, async (req, res) => {
  //to create a Department
  try {
    const dep = await semester.find({
      semestercode: req.body.semestercode,
      academicyearcode: req.body.academicyearcode,
    });
    console.log(dep)
    if (!(dep.length === 0)) {
      return res
        .status(400)
        .json({ msgtype: false, msg: "Semester already exist" });
    }

    const newdep = await semester.create({
      semestername: req.body.semestername,
      semestercode: req.body.semestercode,
      academicyearname: req.body.academicyearname,
      academicyearcode: req.body.academicyearcode,
    });

    res.json({ msgtype: true, msg: "Semester Registered" });
    // addlog(
    //   req.adminuser.id,
    //   "admin",
    //   `Department "${req.body.departmentname}" Registered`,
    //   "Main"
    // );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

router.post("/getsemesterlist", fetchuser, async (req, res) => {
  try {
    const semesterlist = await semester
      .find({ academicyearcode: req.body.academicyearcode })
      .select("-date")
      .select("-_id")
      .select("-__v");

    res.json({ msgtype: true, msg: "Semester List", semesterlist });
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
