var mongoose = require("mongoose");
//mongoose.Promise = global.Promise;
var productSch= require("../schemas/product.js").product;
var url = "mongodb://localhost:27017/newshop";
var Product = mongoose.model("Product",productSch);

var userSchema = require("../schemas/user.js").user;
var User = mongoose.model("User",userSchema);

var user = function(wagner){
     wagner.factory("User",function(){
        return User;
    });
}


mongoose.connect(url,(err)=>{
	if(err)
	{
		console.log(err);
	}
    console.log("connected to db");

});

module.exports={
    Product,
    user 
}

