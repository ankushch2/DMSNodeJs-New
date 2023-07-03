const middleware = require("../middleware/auth.validate");
module.exports = app => {
    const dms = require("../controllers/dms.controller");
  
    var router = require("express").Router();
  
    
    router.get("/", dms.findAll);
    router.get("/data", dms.getdms);
    router.put('/:id', dms.update);
    router.delete('/:id', dms.delete);
    router.get("/search",[middleware.verifyToken], dms.search);
    app.use('/api/v1/dms', router);
  };