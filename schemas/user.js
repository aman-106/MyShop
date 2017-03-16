var mongoose = require("mongoose");

var userSchema = {
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    picture:{
        type:String,
        match:/^http:\/\//
    },
    data:{
        oauth:{
            type:String,
            required:true
        },
        cart:{
            productCount:{
                type:Number,
                default:1,
                min:1
            },
            product:[{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }]
        }
        
    }

};

var user = mongoose.Schema(userSchema);
module.exports={
    user
}

//var user = require("schemas/user.js").user;