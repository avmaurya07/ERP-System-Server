var jwt = require("jsonwebtoken");
const teacheruser = require("../models/users/TeacherUser");
const cordinator = require("../models/users/Cordinator");
const adminuser = require("../models/users/AdminUser");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchteacher = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msgtype: false, msg: "Not authorized" });
  }

  try {
    // Verify the token and extract the user data
    const data = jwt.verify(token, JWT_SECRET);
    req.teacheruser = data.user;

    // Check if the user exists in the TeacherUser or Cordinator collections
    const userExists = await teacheruser.findById(req.teacheruser.id) || await cordinator.findById(req.teacheruser.id) || await adminuser.findById(req.teacheruser.id);
    if (!userExists) {
      return res.status(401).json({ msgtype: false, msg: "Not authorized" });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors during the token verification or database query
    res.status(401).json({ msgtype: false, msg: "Not authorized" });
  }
};

module.exports = fetchteacher;
