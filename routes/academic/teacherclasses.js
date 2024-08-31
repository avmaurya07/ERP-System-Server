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

router.post("/teacherclasses", fetchteacher, async (req, res) => {
    //to get courses of a student
  try {
    const user = await teacheruser.findById(req.teacheruser.id);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const teachercode = user.empid;
    const teacherclasses = await classes.find({teachercode:teachercode});
    
    
    return res.json({msgtype:true,msg:"Classes fetched successfully",teacherclasses:teacherclasses});

  } catch (error) {
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});



module.exports = router;
