const mongoose = require("mongoose");

//--------------------User Details Model---------------------------- // 
const userSchema = mongoose.Schema({
  firstname: {type:String, required:true},
  lastname: {type:String, required:true},
  contact: {type:Number, required:true},
  authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" }, //Collection should be called
});
const user = mongoose.model("user", userSchema);

//--------------------User Help Request Model---------------------------- // 
const helprequestSchema = mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, required:true, ref: "user" },
  helprequest: {type:String, required:true},
  helprequestdate: {type:Date, default: Date.now()},
});
const helprequest = mongoose.model("HelpReq", helprequestSchema);

module.exports = { user, helprequest };
