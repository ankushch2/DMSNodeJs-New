const {generateCrudMethods}= require('../services/index')
const dms = require('../models/dms.model');
const dmsCrud = generateCrudMethods(dms);
const ObjectId = require('mongoose').Types.ObjectId;

exports.getName= (req,res)=>{
    res.json("Employee name is -> Ankush")
}
exports.getdms= (req,res,next)=>{

    console.log(req.query.limit,req.query.page);

    dms.find()
    .limit(req.query.limit)
    .skip(req.query.limit*req.query.page)
    .sort({firstName:req.query.sort})
    .then((data)=>{
        res.status(200).json(data);
    }).catch(err=>res.status(400).json(err))
}
exports.findAll = (req,res,next)=>{
    dmsCrud.getAll()
    .then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        res.status(400).json({
            error: err
        });
    })
}
exports.search= (req,res,next)=>{

    let searchQuery= '';
    if(req.query.by==='firstname' )
    {
        searchQuery={"firstName": { $regex: '.*' + req.query.name + '.*' }};
    }
    else if(req.query.by==='lastname' )
    {
        searchQuery={
        "lastName":{ $regex: '.*' + req.query.lastname + '.*' }      
        };

    }
    else if(req.query.by==='designation' )
    {
        searchQuery={"designation":{ $regex: '.*' + req.query.designation + '.*' } 
        };
    }

    console.log(searchQuery)
    dms.find(searchQuery)
    .then(data=>{
        res.status(200).json(data);
    })

}
    exports.create= (req,res,next)=>{
        console.log(req.body)
        dmsCrud.create(req.body)
        .then(data=>{
            res.status(201).json(data)
        }).catch(err=>{
            res.status(400).json(err)
        })
    }
    exports.getById = (req,res,next)=>{

        if(ObjectId.isValid(req.params.id)==false)
        {
            res.status(400).json({
                error:"given object id is not valid"
            })
        }
        else
        dmsCrud.getById(req.params.id)
        .then(data=>{
            res.status(200).json(data);
        }).catch(err=>{
            res.status(400).json({
                error: err
            });
        })
    } 
    exports.update = (req, res,next) => {
        
        if(!req.body) {
            return res.status(400).send({
                message: "Please fill all required field"
            });
        }
               
        dms.findByIdAndUpdate(req.params.id, {
            first_name: req.body.first_name, 
            last_name: req.body.last_name,
            email: req.body.last_name,
            phone: req.body.last_name
        }, {new: true})
        .then(data => {
            if(!dms) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send(dms);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
    };
    
    
    exports.delete = (req, res,next) => {
        dms.findByIdAndRemove(req.params.id)
        .then(data => {
            if(!dms) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send({message: "user deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
    };   
