const express = require("express");
const router = express.Router();
const studentuser = require("../../models/users/StudentUser");
const batches = require("../../models/academics/batches");
const classes = require("../../models/academics/classes");
const timetable = require("../../models/academics/timetable");
const fetchuser = require("../../middleware/fetchuser");
const { getWeek, getYear, addWeeks } = require("date-fns");
const cron = require("node-cron");

// Schedule a cron job to run every Saturday at 11:58 PM
cron.schedule("58 23 * * 6", async () => {
  await updateTimetableForNextWeek();
});

const updateTimetableForNextWeek = async () => {
  try {
    const currentDate = new Date();
    const nextWeekDate = addWeeks(currentDate, 1);
    const weekNumber = getWeek(nextWeekDate);
    const year = getYear(nextWeekDate);
    const weekcode = `${year}-${weekNumber}`;

    // Fetch existing timetable entries for the next week
    const existingTimetableEntries = await timetable.find({ weekcode });

    // Fetch old timetable
    const oldWeekcode = `${getYear(currentDate)}-${getWeek(currentDate)}`;
    const oldTimetableEntries = await timetable.find({ weekcode: oldWeekcode });

    // Create new timetable entries based on old ones
    for (const entry of oldTimetableEntries) {
      const classcode = entry.classcode;
      const entryExists = existingTimetableEntries.some(
        (existingEntry) => existingEntry.classcode === classcode
      );

      if (!entryExists) {
        const newEntry = { ...entry.toObject(), weekcode };
        delete newEntry._id; // Remove the old id to create a new document
        await timetable.create(newEntry);
      }
    }
  } catch (error) {
    console.error("Error updating timetable:", error);
  }
};

router.post("/studenttimetable", fetchuser, async (req, res) => {
  try {
    const user = await studentuser.findById(req.user.id);
    const systemid = user.systemid;
    const studentbatches = await batches.find({
      "students.systemid": systemid,
    });
    const weekcode = req.body.weekcode;

    let studentclasses = [];
    for (const batch of studentbatches) {
      const { batchcode, academicyearcode, semestercode } = batch;
      const courses = await classes.find({
        batchcode,
        academicyearcode,
        semestercode,
      });
      studentclasses = studentclasses.concat(courses);
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
    let studenttimetable = {};

    days.forEach((day) => {
      slots.forEach((slot) => {
        studenttimetable[`${day}${slot}`] = [];
      });
    });

    // Populate the timetable
    for (const course of studentclasses) {
      const { classcode, coursecode, coursename, teachername } = course;
      const timetableEntries = await timetable.find({ classcode, weekcode });

      for (const entry of timetableEntries) {
        days.forEach((day) => {
          slots.forEach((slot) => {
            const key = `${day}${slot}`;
            if (entry.schedule[key]) {
              const RoomNo = entry.roomno[key];
              studenttimetable[key].push({
                coursecode,
                coursename,
                teachername,
                RoomNo,
              });
            }
          });
        });
      }
    }

    return res.json({
      msgtype: true,
      msg: "Timetable fetched successfully",
      timetable: studenttimetable,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error occurred" });
  }
});



module.exports = router;
