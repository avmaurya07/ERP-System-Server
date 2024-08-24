const express = require("express");
const school = require("../../models/main/School");
const department = require("../../models/main/Department");
const fetchadmin = require("../../middeleware/fetchadmin");
const fetchuser = require("../../middeleware/fetchuser");
const router = express.Router();
const { addlog } = require("../logs/logs");
const Department = require("../../models/main/Department");

router.post("/createdepartment", fetchadmin, async (req, res) => {
  //to create a Department
  try {
    const dep = await department.findOne({
      departmentcode: req.body.departmentcode,
    });
    if (dep) {
      return res
        .status(400)
        .json({ msgtype: false, msg: "Department already exist" });
    }

    const newdep = await department.create({
      departmentname: req.body.departmentname,
      schoolcode: req.body.schoolcode,
      departmentcode: req.body.departmentcode,
    });

    res.json({ msgtype: true, msg: "Department Registered" });
    addlog(
      req.adminuser.id,
      "admin",
      `Department "${req.body.departmentname}" Registered`,
      "Main"
    );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

router.post("/getdepartmentlist", fetchuser, async (req, res) => {
  try {
    const departmentlist = await department
      .find({ schoolcode: req.body.schoolcode })
      .select("-date")
      .select("-_id")
      .select("-__v");

    res.json({ msgtype: true, msg: "Department List", departmentlist });
    addlog(
      req.user.id,
      req.user.usertype,
      "List of Departments Accessed",
      "Data Access"
    );
  } catch (error) {
    res
      .status(500)
      .json({ msgtype: false, msg: "Internal server error ocurred" });
  }
});

module.exports = router;
