const express = require("express");
const school = require("../../models/main/School");
const fetchadmin = require("../../middleware/fetchadmin");
const fetchuser = require("../../middleware/fetchuser");
const router = express.Router();
const { addlog } = require("../logs/logs");

router.post("/createschool", fetchadmin, async (req, res) => {
  //to create a school
  try {
    let sch = await school.findOne({ schoolcode: req.body.schoolcode });
    if (sch) {
      return res
        .status(400)
        .json({ msgtype: false, msg: "School already exist" });
    }

    sch = await school.create({
      schoolname: req.body.schoolname,
      schoolcode: req.body.schoolcode,
    });

    res.json({ msgtype: true, msg: "School Registered" });
    addlog(
      req.adminuser.id,
      "admin",
      `School "${req.body.schoolname}" Registered`,
      "Main"
    );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

router.get("/getschoollist", fetchuser, async (req, res) => {
  try {
    const schoollist = await school
      .find()
      .select("-date")
      .select("-_id")
      .select("-__v");

    res.json({ msgtype: true, msg: "School List", schoollist });
    addlog(
      req.user.id,
      req.user.usertype,
      "List of Schools Accessed",
      "Data Access"
    );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

module.exports = router;
