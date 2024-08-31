const connectToMongo = require("./db.js");
const express = require("express");
const cors = require('cors')
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json())
connectToMongo();
const port = process.env.PORT || 5000;


//just for fun
app.get("/",(req,res) => {
  res.send("<h1>You are on ERP System Server</h1>")
})

//Available routes yani ki apis
app.use("/api/auth", require("./routes/auth/createuser"));
app.use("/api/auth", require("./routes/auth/login"));
app.use("/api/auth", require("./routes/auth/masterlogin"));
app.use("/api/auth", require("./routes/auth/changepassword"));
app.use("/api/auth", require("./routes/auth/resetpassword"));
app.use("/api/users", require("./routes/user/userlist"));
// app.use("/api/logs", require("./routes/logs/logs"));
app.use("/api/master", require("./routes/main/school"));
app.use("/api/master", require("./routes/main/department"));
app.use("/api/master", require("./routes/main/academicyear"));
app.use("/api/master", require("./routes/main/semester"));
app.use("/api/academic", require("./routes/academic/batch"));
app.use("/api/academic", require("./routes/academic/classes"));
app.use("/api/academic", require("./routes/academic/mycourses"));
app.use("/api/academic", require("./routes/academic/teacherclasses"));



app.listen(port,"0.0.0.0", () => {
  console.log(`ERP-System Server listening at http://localhost:${port}`);
});
