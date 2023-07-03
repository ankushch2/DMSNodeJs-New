const mongoose =require('mongoose');
const dms = require("../models/dms.model");
const validator = require("validator")

console.log(dms);

module.exports= mongoose.model('user',{
    mobile:{type: String,
        require:true,
        unique:true,
    },
    email:{
        type: String,
        require:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            res.status(200).json({"token":"Email is inValid"})
        }
    },
    password:{
        type: String,
        require:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is inValid");
            }
        }
    },
    token:{type: String},
    role:{type: String},
    dms:{type:dms.schema},
});