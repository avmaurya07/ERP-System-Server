const express = require("express");
const router = express.Router();
const cordinatoruser = require("../../models/users/Cordinator");
const classes = require("../../models/academics/classes");
const timetable = require("../../models/academics/timetable");
const fetchteacher = require("../../middleware/fetchteacher");
const { getWeek, getYear } = require("date-fns");

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
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error occurred" });
  }
});


router.post("/edittimetable", fetchteacher, async (req, res) => {
  try {
            const newtimetable = await timetable.findOneAndUpdate(
        { weekcode: req.body.weekcode, classcode: req.body.classcode },
        { $set: { schedule: req.body.schedule, roomno: req.body.roomno } },
        { new: true } 
      );

    return res.json({
      msgtype: true,
      msg: "Timetable Updated successfully",
      timetable: newtimetable,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error occurred" });
  }
});


router.post("/generatetimetable", fetchteacher, async (req, res) => {
  try {
    const currentDate = new Date();
    const weekNumber = getWeek(currentDate);
    const year = getYear(currentDate);
    const weekcode = `${year}-${weekNumber}`;

    const user = await cordinatoruser.findById(req.teacheruser.id);
    const classList = await classes.find({
      academicyearcode: req.body.academicyearcode,
      semestercode: req.body.semestercode,
      schoolcode: user.school,
      departmentcode: user.department,
    });

    if (req.body.copy) {
      // Copy the previous week's timetable to the next week
      const previousWeekTimetable = await timetable.find({
        weekcode: weekcode,
        classcode: { $in: classList.map(classs => classs.classcode) },
      });

      for (const entry of previousWeekTimetable) {
        const existingEntry = await timetable.findOne({
          weekcode: req.body.weekcode,
          classcode: entry.classcode,
        });

        if (!existingEntry) {
          await timetable.create({
            weekcode: req.body.weekcode,
            classcode: entry.classcode,
            schedule: entry.schedule,
            roomno: entry.roomno,
          });
        }
      }
    } else {
      // Copy the previous week's timetable to the next week
      const previousWeekTimetable = await timetable.find({
        weekcode: weekcode,
        classcode: { $in: classList.map(classs => classs.classcode) },
      });

      for (const entry of previousWeekTimetable) {
        const existingEntry = await timetable.findOne({
          weekcode: req.body.weekcode,
          classcode: entry.classcode,
        });

        if (!existingEntry) {
          await timetable.create({
            weekcode: req.body.weekcode,
            classcode: entry.classcode,
          });
        }
      }
    }

    return res.json({
      msgtype: true,
      msg: "Timetable Generated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error occurred" });
  }
});
 
module.exports = router;