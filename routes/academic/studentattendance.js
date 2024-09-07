const express = require("express");
const router = express.Router();
const studentuser = require("../../models/users/StudentUser");
const attendance = require("../../models/academics/attendance");
const fetchuser = require("../../middleware/fetchuser");

router.post("/studentcourseattendance", fetchuser, async (req, res) => {
  try {
    const { systemid, academicyearcode, semestercode, coursecode,weekcode } = req.body;

    // Fetch attendance data for the student filtered by academicyearcode, semestercode, and coursecode
    const attendanceData = await attendance.find({
      "students.systemid": systemid,
      "students.week.weekcode": weekcode,
      academicyearcode: academicyearcode,
      semestercode: semestercode,
      coursecode: coursecode,
    });

    // Filter and format the attendance data
    const studentAttendance = attendanceData.map((course) => {
      const student = course.students.find(
        (student) => student.systemid === systemid
      );
      return {
        coursename: course.coursename,
        coursecode: course.coursecode,
        weeks: student.week,
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