const express = require("express");
const room = require("../../models/main/Room");
const fetchadmin = require("../../middleware/fetchadmin");
const fetchuser = require("../../middleware/fetchuser");
const router = express.Router();
const { addlog } = require("../logs/logs");
const Cordinator = require("../../models/users/Cordinator");

router.post("/createroom", fetchadmin, async (req, res) => {
  //to create a Department
  try {
    if(req.body.room===""){
        return res
        .status(500)
        .json({ msgtype: false, msg: "Room Name cannot be empty" });
    }
    const newdep = await room.create({
        departmentname: req.body.departmentname,
      schoolname: req.body.schoolname,
      room: req.body.room,
    });

    res.json({ msgtype: true, msg: "Room Registered" });
    addlog(
      req.adminuser.id,
      "admin",
      `Room "${req.body.room}" Registered`,
      "Main"
    );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

router.post("/getroom", fetchuser, async (req, res) => {
  try {
    let roomlist = [];
    if (req.user.usertype === "admin") {
      roomlist = await room
        .find({
            schoolname: req.body.schoolname,
            departmentname: req.body.departmentname,
        })
        .select("-date")
        .select("-_id")
        .select("-__v");
    } else if (req.user.usertype==="cordinator") {
      const user = await Cordinator.findById(req.user.id)
      roomlist = await room
        .find({
            schoolname: user.school,
            departmentname: user.department,
        })
        .select("-date")
        .select("-_id")
        .select("-__v");
    }
    else{
        return  res.json({ msgtype: true, msg: "Room List" });
    }
    res.json({ msgtype: true, msg: "Room List", roomlist });
    addlog(
      req.user.id,
      req.user.usertype,
      "List of Room Accessed",
      "Data Access"
    );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

module.exports = router;
