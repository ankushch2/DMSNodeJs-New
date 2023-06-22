const mongoose =require('mongoose');
const dms = require("../models/dms.model");

console.log(dms);

module.exports= mongoose.model('user',{
    mobile:{type: String},
    email:{type: String},
    password:{type: String},
    token:{type: String},
    role:{type: String},
    dms:{type:dms.schema},
});