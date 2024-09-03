const express = require("express");
const router = express.Router();
const cordinatoruser = require("../../models/users/Cordinator");
const classes = require("../../models/academics/classes");
const timetable = require("../../models/academics/timetable");
const fetchteacher = require("../../middleware/fetchteacher");

router.post("/cordinatortimetable", fetchteacher, async (req, res) => {
  try {
    const user = await cordinatoruser.findById(req.teacheruser.id);
    const classList = await classes.find({
      academicyearcode: req.body.academicyearcode,
      semestercode: req.body.semestercode,
      schoolcode: user.school,
      departmentcode: user.department,
    });

    const timetables = await timetable.find({
      weekcode: req.body.weekcode,
      classcode: { $in: classList.map((classs) => classs.classcode) },
    });

    return res.json({
      msgtype: true,
      msg: "Timetable fetched successfully",
      timetable: timetables,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error occurred" });
  }
});

module.exports = router;