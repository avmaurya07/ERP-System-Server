const logs = require("../../models/logs/logs");
const addlog = async (user,usertype,logdata,logtype)=> {
  const log = await logs.create({
    user: user,
    usertype: usertype,
    logdata: logdata,
    logtype:logtype,
  });
}

module.exports = {
  addlog,
};
