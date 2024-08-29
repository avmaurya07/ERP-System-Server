const express = require("express");
const cordinator = require("../../models/users/Cordinator");
const batches = require("../../models/academics/batches");
const courses = require("../../models/academics/courses");
const fetchteacher = require("../../middleware/fetchteacher");
const fetchuser = require("../../middleware/fetchuser");
const classes = require("../../models/academics/classes");
const router = express.Router();
const { addlog } = require("../logs/logs");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");

router.post("/mycourses", fetchuser, async (req, res) => {
    //to get courses of a student
  try {
    const user = await studentuser.findById(req.user.id);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const systemid = user.systemid;
    const studentbatches = await batches.find({"students.systemid":systemid});
    let studentcourses = [];
    for (const batch of studentbatches) {
        const { batchcode, academicyearcode, semestercode } = batch;
        const courses = await classes.find({ batchcode, academicyearcode, semestercode });
        studentcourses = studentcourses.concat(courses);
    }
    return res.json({msgtype:true,msg:"Courses fetched successfully",mycourses:studentcourses});

  } catch (error) {
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});



module.exports = router;
