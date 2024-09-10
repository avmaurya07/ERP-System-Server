const express = require("express");
const router = express.Router();
const attendance = require("../../models/academics/attendance");
const fetchuser = require("../../middleware/fetchuser");

router.post("/studentcourseattendance", fetchuser, async (req, res) => {
  try {
    const { systemid, academicyearcode, semestercode, coursecode, weekcode } = req.body;

    // Fetch attendance data for the student filtered by academicyearcode, semestercode, coursecode, and weekcode
    const attendanceData = await attendance.find({
      systemid: systemid,
      academicyearcode: academicyearcode,
      semestercode: semestercode,
      coursecode: coursecode,
      weekcode: weekcode,
    });

    // Format the attendance data
    const studentAttendance = attendanceData.map((course) => {
      return {
        coursename: course.coursename,
        coursecode: course.coursecode,
        attendance: course.attendance,
      };
    });

    return res.json({
      msgtype: true,
      msg: "Attendance fetched successfully",
      attendance: studentAttendance,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error occurred" });
  }
});

module.exports = router;