const express = require("express");
const adminuser = require("../../models/users/AdminUser");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");
const cordinator = require("../../models/users/Cordinator");
const fetchadmin = require("../../middleware/fetchadmin");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const salt = process.env.salt;
const { addlog} = require('../logs/logs');



router.post("/createuser",fetchadmin,async (req,res)=>{


    


    //to create a admin
    try {
        if (req.body.usertype=="admin"){
        let user = await adminuser.findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({msgtype:false, msg: "User already exist" });
        }
        //salting
        const secPass = await bcrypt.hash(req.body.password, salt);
        // to create the user
  
        user = await adminuser.create({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: secPass,
        });
        //for creating a auth token
        const data = {
          user: {
            id: user.id,
          },
        };
  
        const authtoken = jwt.sign(data, JWT_SECRET);
  
      
        res.json({ msgtype:true,authtoken,msg:"Admin Registered" });
        addlog(req.adminuser.id,"admin",`Admin user registered with email: "${req.body.email}"`,"RegisterUser")
      }} catch (error) {
        res.status(500).json({msgtype:false,msg:"Internal server error ocurred"});
      }


    //to create a student
    try {
        if (req.body.usertype=="student"){
        let user = await studentuser.findOne({ systemid: req.body.systemid });
        if (user) {
          return res.status(400).json({msgtype:false, msg: "User already exist" });
        }
        //salting
        const secPass = await bcrypt.hash(req.body.password, salt);
        // to create the user
  
        user = await studentuser.create({
          systemid: req.body.systemid,
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          school: req.body.school,
          department: req.body.department,
          password: secPass,
        });
        //for creating a auth token
        const data = {
          user: {
            id: user.id,
          },
        };
  
        const authtoken = jwt.sign(data, JWT_SECRET);
  
      
        res.json({ msgtype:true,authtoken,msg:"Student Registered" });
        addlog(req.adminuser.id,"admin",`Student user registered with SystemID: "${req.body.systemid}"`,"RegisterUser")
      }} catch (error) {
        res.status(500).json({msgtype:false,msg:"Internal server error ocurred"});
        console.log(error)
      }


    //to create a teacher
    try {
        if (req.body.usertype=="teacher"){
        let user = await teacheruser.findOne({ empid: req.body.empid });
        if (user) {
          return res.status(400).json({msgtype:false, msg: "User already exist" });
        }
        //salting
        const secPass = await bcrypt.hash(req.body.password, salt);
        // to create the user
  
        user = await teacheruser.create({
            empid: req.body.empid,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            school: req.body.school,
            department: req.body.department,
            password: secPass,
        });
        //for creating a auth token
        const data = {
          user: {
            id: user.id,
          },
        };
  
        const authtoken = jwt.sign(data, JWT_SECRET);
  
      
        res.json({ msgtype:true,authtoken,msg:"Teacher Registered" });
        addlog(req.adminuser.id,"admin",`Teacher user registered with EmpID: "${req.body.empid}"`,"RegisterUser")
      }} catch (error) {
        res.status(500).json({msgtype:false,msg:"Internal server error ocurred"});
      }


      // to create a cordinator
    try {
        if (req.body.usertype=="cordinator"){
        let user = await cordinator.findOne({ empid: req.body.empid });
        if (user) {
          return res.status(400).json({msgtype:false, msg: "User already exist" });
        }
        // to create the user
  
        user = await cordinator.create({
            empid: req.body.empid,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            school: req.body.school,
            department: req.body.department,
        });
        res.json({ msgtype:true,msg:"Cordinator Registered" });
        addlog(req.adminuser.id,"admin",`Cordinator user registered with EmpID: "${req.body.empid}"`,"RegisterUser")
      }} catch (error) {
        res.status(500).json({msgtype:false,msg:"Internal server error ocurred"});
      }
})


module.exports = router