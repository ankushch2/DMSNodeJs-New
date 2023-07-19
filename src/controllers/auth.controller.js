const {generateCrudMethods}= require('../services/index')
const AuthUser = require('../models/auth.user.model');
const dms = require('../models/dms.model');
const authCrud= generateCrudMethods(AuthUser);
const ObjectId = require('mongoose').Types.ObjectId;
const crypto = require('crypto');
var bcrypt = require('bcryptjs');

exports.login= (req,res,next)=>{
    console.log("req.body",req.body);
    AuthUser.findOne({ mobile: req.body.mobile}).then(data=>{
          console.log(data.mobile);
          if(req.body.mobile && req.body.OTP)
            res.status(200).json({"token":data.token,"mobile":data.mobile,"role":data.role});
          else{
            res.status(400).json({"err":"Inavlid OTP"});
          }

      }).catch(err=>{
        res.status(400).json({"err":"Phone Number doesnot exists"});
      })
}



exports.signin= async(req, res, next) => {
    try {
        const{
        email,password
    }=req.body
    if(email && password){
        const user = await AuthUser.findOne({email:email})
        if(user!=null){
            if(password==user.password)
           {
                res.status(200);
                res.json({
                  email: user.email,
                  token: user.token,
                  "status":"success",
                  "message":"Login Successfully!"
                  
                });
            }else{
                res.send({"status":"failed","message":"email or password is Invalid!"})
            }
        }else{
            res.send({"status":"failed","message":"Not Registered"})
        }
    }
}
finally{
    console.log(req.body);
}   
}

exports.register= async(req,res,next) =>{
    const {
         email, mobile
    }=req.body;
    const user = await AuthUser.findOne({email: email});
    const user1 = await AuthUser.findOne({mobile: mobile});
    if(user1){
        res.send({status:"failed", message:"Mobile already exists"});
    }else{
    if(user){
        res.send({status:"failed", message:"email already exists"});
    }else{
    req.body.token= crypto.randomBytes(16).toString("hex");
    (req.body.role==="Dealer")?req.body.dms.isUserApproved=true:req.body.dms.isUserApproved=false;

    authCrud.create(req.body).then((regData)=>{
        dms.create(req.body.dms)
        .then(data=>{
            regData.token="";
            regData.dms=data;
            res.status(201).json(regData)
        }).catch(err=>{
            res.status(400).json(err)
        })
        //res.status(201).json(data);
    })
}
    }
}

exports.approval= (req,res,next)=>{
    console.log(req.body);
    dms.findOne({ mobile: req.body.mobile}).then(data=>{
          console.log(data);
          data.isUserApproved=true;
          dms.findByIdAndUpdate(data._id,data).then(data1=>{
            console.log(data1)
            res.status(200).json({"status":"User is Approved by Admin"});
        })
      }).catch(err=>console.log(err))
}

exports.generateOTP= (req,res,next)=>{
    console.log('generateOTP',req.params.mobile);
    const {OTP}=req.body;
    AuthUser.findOne({ mobile: req.params.mobile}).then(data=>{
        console.log(" The mobile NO: "+data.mobile);
        res.status(200).json({
          //  "OTP":"123456"
    
            "OTP": data.OTP=crypto.randomBytes(2).toString("hex")

        });

      }).catch(err=>
        res.status(400).json({
            "error":"Phone no doesnot Exist"
        })
        )
}

exports.generateToken= (req,res,next)=>{
    console.log('generateToken',req.body);
    AuthUser.findOne({ mobile: req.body.mobile}).then(data=>{
        console.log(data);
        if(data && req.body.OTP==="123456")
            res.status(200).json({"token":data.token});
        else
        {
            res.status(403).json({"status":"Invalid OTP"});
        }

    }).catch(err=>console.log(err))
}