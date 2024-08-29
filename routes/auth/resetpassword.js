const express = require("express");
const adminuser = require("../../models/users/AdminUser");
const studentuser = require("../../models/users/StudentUser");
const teacheruser = require("../../models/users/TeacherUser");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const router = express.Router();
const { addlog } = require('../logs/logs');

// SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post("/resetpassword", async (req, res) => {
  try {
    let user;
    let perviouspassword;
    if (req.body.usertype == "admin") {
      user = await adminuser.findOne({ email: req.body.systemid });
    } else if (req.body.usertype == "student") {
      user = await studentuser.findOne({ systemid: req.body.systemid });
    } else if (req.body.usertype == "teacher") {
      user = await teacheruser.findOne({ empid: req.body.systemid });
    } else {
      return res.status(400).json({ msgtype: false, msg: "Invalid user type" });
    }

    if (!user) {
      return res.status(404).json({ msgtype: false, msg: "User not found" });
    }

    // Generate a temporary password
    const tempPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Update the user's password in the database
    perviouspassword=user.password;
    user.password = hashedPassword;
    user.istempPassword = true;
    await user.save();

    // Send the temporary password to the user's email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `Hello ${user.name},\n Your password is changed for your email "${user.email}"\n Your new password is: ${tempPassword} \n Please change your password after login.`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        user.password = perviouspassword;
        user.istempPassword = false;
        await user.save();
        return res.status(500).json({ msgtype: false, msg: "Error sending email"});
      } else {
        res.json({ msgtype: true, msg: "Temporary password sent to your email" });
        addlog(user.id, req.body.usertype, "Password Reset", "Passwordreset");
      }
    });
  } catch (error) {
    res.status(500).json({ msgtype: false, msg: "Internal server error occurred" });
  }
});

module.exports = router;