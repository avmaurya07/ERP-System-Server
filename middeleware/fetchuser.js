var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  //get the user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Not athorized" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user=data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not athorized" });
  }
};

module.exports = fetchuser;
