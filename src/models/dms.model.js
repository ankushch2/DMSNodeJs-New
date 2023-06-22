const mongoose =require('mongoose');

module.exports= mongoose.model('dms',{
    firstName:{type: String},
    lastName:{type: String},
    type:{type: String},
    pan:{type: String},
    gst:{type: String},
    address: {type: String},
    dealerId:{type: String},
    isUserApproved:{type:Boolean},
});