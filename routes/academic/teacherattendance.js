const express = require("express");
const router = express.Router();
const attendance = require("../../models/academics/attendance");
const fetchteacher = require("../../middleware/fetchteacher");
const classes = require("../../models/academics/classes");
const batch = require("../../models/academics/batches");

router.post("/takeattendance", fetchteacher, async (req, res) => {
  try {
    const { academicyearcode, semestercode, coursecode, weekcode, classcode,batchcode,coursename,slot } =
      req.body;


      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const day = slot.slice(0, -1);
      const slot1 = parseInt(slot.slice(-1)); 
      const y = days.indexOf(day); 
      const x = slot1 - 1;


    // to fetch the list of students in the class
    const batchdata = await batch.findOne({
        academicyearcode,
        semestercode,
        batchcode,
        });
    const students = batchdata.students;
    
    const attendanceData = await attendance.find({
        academicyearcode,
        semestercode,
        coursecode,
        weekcode,
    });
    
    const notinListStudents = students.filter(student => !attendanceData.some(data => data.systemid === student.systemid));
    const createAttendence = await attendance.insertMany(notinListStudents.map(student => ({
        academicyearcode,
        semestercode,
        coursecode,
        coursename,
        weekcode,
        systemid: student.systemid,
    })));
    
      const attendanceData1 = students.map(student => {
        const attendanceInfo = attendanceData.find(data => data.systemid === student.systemid);
        return {
            ...student,
            attendance: attendanceInfo.attendance[0][x][y] ? attendanceInfo.attendance[0][x][y] : ""
        };
    });

   

    return res.json({
      msgtype: true,
      msg: "Attendance fetched successfully",
      students: attendanceData1,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error occurred" });
  }
});

module.exports = router;
