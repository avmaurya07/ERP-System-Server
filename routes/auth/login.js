const express = require("express");
const adminuser = require("../../models/users/AdminUser");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");
const cordinator = require("../../models/users/Cordinator");
const fetchuser = require("../../middeleware/fetchuser");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { addlog} = require('../logs/logs');


router.post("/login",async (req,res)=>{


    


    
    try {
        //to login a admin
        if (req.body.usertype=="admin"){

            const { systemid, password } = req.body;
            const email = systemid;
            try {
              //to check user exist or not
              let user = await adminuser.findOne({ email });
              //if user does not exist
              if (!user) {
                return res.status(400).json({msgtype:false, msg: "Invalid SystemID/Password" });
              }
              //to compare entered password with the database
              const passwordCompare = await bcrypt.compare(password, user.password);
              //if password is wrong
              if (!passwordCompare) {
                return res.status(400).json({msgtype:false, msg: "Invalid SystemID/Password" });
              }
              //for creating a auth token
              const data = {
                user: {
                  id: user.id,
                },
              };
        
              const authtoken = jwt.sign(data, JWT_SECRET);
        
              res.json({ msgtype:true,authtoken,msg:"Login Success",usertype:"admin" });
              addlog(user.id,"admin","Login Success","Login")
            } catch (error) {
              res.status(500).json({msgtype:false,msg:"Internal server error ocurred"});
            }

        }
      




    //to login a student
    
        if (req.body.usertype=="student"){

            const { systemid, password } = req.body;
            try {
              //to check user exist or not
              let user = await studentuser.findOne({ systemid });
              //if user does not exist
              if (!user) {
                return res.status(400).json({msgtype:false, msg: "Invalid SystemID/Password" });
              }
              //to compare entered password with the database
              const passwordCompare = await bcrypt.compare(password, user.password);
              //if password is wrong
              if (!passwordCompare) {
                return res.status(400).json({msgtype:false, msg: "Invalid SystemID/Password" });
              }
              //for creating a auth token
              const data = {
                user: {
                  id: user.id,
                },
              };
        
              const authtoken = jwt.sign(data, JWT_SECRET);
        
              res.json({ msgtype:true,authtoken,msg:"Login Success",usertype:"student" });
              addlog(user.id,"student","Login Success","Login")
            } catch (error) {
              res.status(500).json({msgtype:false,msg:"Internal server error ocurred"});
            }

        }
        




    //to login a teacher
    
        if (req.body.usertype=="teacher"){

          const { systemid, password } = req.body;
          const empid = systemid;
            try {
              //to check user exist or not
              let user = await teacheruser.findOne({ empid });
              //if user does not exist
              if (!user) {
                return res.status(400).json({msgtype:false, msg: "Invalid SystemID/Password" });
              }
              //to compare entered password with the database
              const passwordCompare = await bcrypt.compare(password, user.password);
              //if password is wrong
              if (!passwordCompare) {
                return res.status(400).json({msgtype:false, msg: "Invalid SystemID/Password" });
              }
              //for creating a auth token
              const data = {
                user: {
                  id: user.id,
                },
              };
        
              const authtoken = jwt.sign(data, JWT_SECRET);
        
              res.json({ msgtype:true,authtoken,msg:"Login Success",usertype:"teacher" });
              addlog(user.id,"teacher","Login Success","Login")
            } catch (error) {
              res.status(500).json({msgtype:false,msg:"Internal server error ocurred"});
            }

        }
        } catch (error) {
        res.status(500).json({msgtype:false,msg:"Internal server error ocurred"});
      }
})


//  to fetch the user data

router.post("/getuserdata",fetchuser,async (req,res)=>{

    try {
        if (req.body.usertype=="admin"){
        const userId = req.user.id;
        const user = await adminuser.findById(userId)
          .select("-password")
          .select("-date")
          .select("-_id")
          .select("-__v");
        res.json({user});
    }
        if (req.body.usertype=="student"){
        const userId = req.user.id;
        const user = await studentuser.findById(userId)
          .select("-password")
          .select("-date")
          .select("-_id")
          .select("-__v");
        res.json({user});
    }
        if (req.body.usertype=="teacher"){
        const userId = req.user.id;
        const user = await teacheruser.findById(userId)
          .select("-password")
          .select("-date")
          .select("-_id")
          .select("-__v");
          const cordinatoruser = await cordinator.findOne({empid:user.empid})
          let iscordinator = false
          if(cordinatoruser){
            iscordinator=true
          }
        res.json({user,iscordinator});
    }
        if (req.body.usertype=="cordinator"){
        const userId = req.user.id;
        const user = await cordinator.findById(userId)
          .select("-date")
          .select("-_id")
          .select("-__v");
        res.json({user});
    }
      } catch (error) {
        res.status(500).json({msgtype:false,msg:"Internal server error ocurred"});
      }

})

module.exports = router