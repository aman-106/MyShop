var mongoose = require("mongoose");

var categorySchema = require("./category.js").categorySchema;
var prodSchema = {
    name:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        match:/^http:\/\//
    },
    price:{
        amount:{
                type:Number,
                required:true
        },
        currency:{
            type:String,
            enum:["usd","inr"]          
        }
    },
//    embedded schema
    category:categorySchema
//    using ref
//    category:{
//        type:String,
//        ref:"Category"
//    }
    
};

//    category:category
var product = mongoose.Schema(prodSchema);
module.exports={
    product , prodSchema
}

//to import the product 
//var {product} = require("/schemas/product.js")
//or 
//var product = require().product;