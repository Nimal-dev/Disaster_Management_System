const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
    statename: {type:String, required:true},
    contact: {type:Number, required:true},
    location: {type:String, required:true},
    address: {type:String, required:true},
    authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },

});
const state = mongoose.model("state", stateSchema);

module.exports = {state: state}