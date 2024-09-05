const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const cordinatoruser = require("../../models/users/Cordinator");
const classes = require("../../models/academics/classes");
const timetable = require("../../models/academics/timetable");
const fetchteacher = require("../../middleware/fetchteacher");
const { getWeek, getYear } = require("date-fns");
const cron = require("node-cron");

const writeTimetableToFile = (weekcode, data) => {
  const filePath = path.join(__dirname, `../../temp/timetable_${weekcode}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const readTimetableFromFile = async (weekcode) => {
  const filePath = path.join(__dirname, `../../temp/timetable_${weekcode}.json`);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } else {
    const timetables = await timetable.find({ weekcode });
    if (timetables.length > 0) {
      writeTimetableToFile(weekcode, timetables);
      return timetables;
    }
  }
  return null;
};

const updateAllTempFiles = async () => {
  try {
    const weekcode = `${getYear(new Date())}-${getWeek(new Date())}`;
    const timetables = await timetable.find({ weekcode });

    writeTimetableToFile(weekcode, timetables);
    console.log("All temp files updated successfully");
  } catch (error) {
    console.error("Error updating temp files:", error);
  }
};

// Schedule the job to run at 11:59 PM daily
cron.schedule("19 17 * * *", updateAllTempFiles);

router.post("/cordinatortimetable", fetchteacher, async (req, res) => {
  try {
    const weekcode = req.body.weekcode;
    let timetables = await readTimetableFromFile(weekcode);

    if (!timetables) {
      const user = await cordinatoruser.findById(req.teacheruser.id);
      const classList = await classes.find({
        academicyearcode: req.body.academicyearcode,
        semestercode: req.body.semestercode,
        schoolcode: user.school,
        departmentcode: user.department,
      });
      timetables = await timetable.find({
        weekcode: weekcode,
        classcode: { $in: classList.map((classs) => classs.classcode) },
      });
      writeTimetableToFile(weekcode, timetables);
    }

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

    let timetables = await readTimetableFromFile(req.body.weekcode);
    if (timetables) {
      const index = timetables.findIndex(t => t.classcode === req.body.classcode);
      if (index !== -1) {
        timetables[index] = newtimetable;
        writeTimetableToFile(req.body.weekcode, timetables);
      }
    }

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

    let newTimetables = [];

    if (req.body.copy) {
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
          const newEntry = await timetable.create({
            weekcode: req.body.weekcode,
            classcode: entry.classcode,
            schedule: entry.schedule,
            roomno: entry.roomno,
          });
          newTimetables.push(newEntry);
        }
      }
    } else {
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
          const newEntry = await timetable.create({
            weekcode: req.body.weekcode,
            classcode: entry.classcode,
          });
          newTimetables.push(newEntry);
        }
      }
    }

    writeTimetableToFile(req.body.weekcode, newTimetables);

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