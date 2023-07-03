const middleware = require("../middleware/auth.validate");

module.exports = app => {
    const auth = require("../controllers/auth.controller");
  
    var router = require("express").Router();
  
    router.post("/login", auth.login);
    router.post("/signin", auth.signin);
    router.post("/register", auth.register);   
    
    router.get("/approval",[middleware.verifyToken,middleware.isAdminRole ],auth.approval);    

    router.get("/generateOTP/:mobile", auth.generateOTP);
    router.post("/generateToken", auth.generateToken);

    app.use('/api/v1/dms/auth', router);
  };