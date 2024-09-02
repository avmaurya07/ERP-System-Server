const express = require("express");
const router = express.Router();
const teacheruser = require("../../models/users/TeacherUser");
const batches = require("../../models/academics/batches");
const classes = require("../../models/academics/classes");
const timetable = require("../../models/academics/timetable");
const fetchteacher = require("../../middleware/fetchteacher");
const { getWeek, getYear, addWeeks } = require("date-fns");
const cron = require("node-cron");


router.post("/teachertimetable", fetchteacher, async (req, res) => {
  try {
    const user = await teacheruser.findById(req.teacheruser.id);
    const empid = user.empid;
    const teacherbatches = await classes.find({teachercode:empid});
    const weekcode = req.body.weekcode;

    let teacherclasses = [];
    for (const batch of teacherbatches) {
      const { batchcode, academicyearcode, semestercode } = batch;
      const courses = await classes.find({
        batchcode,
        academicyearcode,
        semestercode,
      });
      teacherclasses = teacherclasses.concat(courses);
    }
    // Initialize an empty timetable structure
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const slots = Array.from({ length: 9 }, (_, i) => i + 1);
    let teachertimetable = {};

    days.forEach((day) => {
      slots.forEach((slot) => {
        teachertimetable[`${day}${slot}`] = [];
      });
    });

    // Populate the timetable
    let timetableEntries =[]
    for (const course of teacherclasses) {
        
      const { batchname, coursecode, coursename, classcode } = course;
      if (classcode.includes(empid)){
      timetableEntries = await timetable.find({ classcode, weekcode });}
      for (const entry of timetableEntries) {
        days.forEach((day) => {
          slots.forEach((slot) => {
            const key = `${day}${slot}`;
            if (entry.schedule[key]) {
                const RoomNo = entry.roomno[key];
                
                // Check if the value already exists at this index
                const alreadyExists = teachertimetable[key].some(item =>
                  item.coursecode === coursecode &&
                  item.coursename === coursename &&
                  item.batchname === batchname &&
                  item.RoomNo === RoomNo
                );
                
                // Push the value only if it doesn't exist
                if (!alreadyExists) {
                  teachertimetable[key].push({
                    coursecode,
                    coursename,
                    batchname,
                    RoomNo,
                  });
                }
              }
              
          });
        });
      }
    }

    return res.json({
      msgtype: true,
      msg: "Timetable fetched successfully",
      timetable: teachertimetable,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error occurred" });
  }
});

module.exports = router;
