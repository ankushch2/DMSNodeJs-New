
const AuthUser = require('../models/auth.user.model');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    AuthUser.findOne({token:token})
    .then(user=>{
        req.userId=user.id;
        next();
    }).catch(err=>{
      res.status(401).json({"error":"Un-Authorize token!"})
    })      
  };

isAdminRole=(req,res,next)=>{
  AuthUser.findById(req.userId)
  .then(user=>{
    console.log('role',user)
      if(user.role==="DEALER")
      {
        next();
      }
      else{
        return res.status(403).send({
          message: "User is Not Admin"
        });
      }
  }).catch(err=>{
    res.status(401).json({"error":"Un-Authorize User Role!"})
  }) 
}


  const middleware = {
    verifyToken: verifyToken,
    isAdminRole:isAdminRole,
  };
  module.exports = middleware;