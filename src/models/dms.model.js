const mongoose =require('mongoose');

module.exports= mongoose.model('dms',{
    firstName:{type: String},
    lastName:{type: String},
    type:{type: String},
    pan:{type: String},
    mypan:{type: String},
    gst:{type: String},
    mygst:{type: String},
    address: {type: String},
    CouponCode:{type: String},
    isUserApproved:{type:Boolean},
});