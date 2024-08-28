const express = require("express");
const academicyear = require("../../models/academics/academicyear");
const batches = require("../../models/academics/batches");
const fetchadmin = require("../../middleware/fetchadmin");
const fetchuser = require("../../middleware/fetchuser");
const router = express.Router();
const { addlog } = require("../logs/logs");

router.post("/createacademicyear", fetchadmin, async (req, res) => {
  //to create a school
  try {
    let sch = await academicyear.findOne({
      academicyearcode: req.body.academicyearcode,
    });
    if (sch) {
      return res
        .status(400)
        .json({ msgtype: false, msg: "Academic Year already exist" });
    }

    sch = await academicyear.create({
      academicyearname: req.body.academicyearname,
      academicyearcode: req.body.academicyearcode,
    });
    res.json({ msgtype: true, msg: "Academic Year Registered" });
    // addlog(
    //   req.adminuser.id,
    //   "admin",
    //   `School "${req.body.adademicyearname}" Registered`,
    //   "Main"
    // );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred"});
  }
});

router.get("/getacademicyearlist", fetchuser, async (req, res) => {
  try {
    const academicyearlist = await academicyear
      .find()
      .select("-date")
      .select("-_id")
      .select("-__v");

    res.json({ msgtype: true, msg: "Academic Year List", academicyearlist });
    // addlog(
    //   req.user.id,
    //   req.user.usertype,
    //   "List of Schools Accessed",
    //   "Data Access"
    // );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

module.exports = router;
