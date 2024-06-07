const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
    email: {type:String, required: true},
    password: {type:String, required: true},
    usertype: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() },
})
const auth = mongoose.model("Auth", loginSchema);


module.exports = {auth:auth};