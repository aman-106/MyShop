//var schema = require("./schemas");
var mongoose = require("mongoose");
//var MongoClient  = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/shoppping";
mongoose.Promise = global.Promise;

//schema -- verified
var categorySchema = mongoose.Schema({
  _id: { type: String },
  parent: {
    type: String,
    ref: 'Category'
  },
  ancestors: [{
    type: String,
    ref: 'Category'
  }]
});

//model
var Category = mongoose.model("Category",categorySchema);

//creating a laptop
var electronics = new Category({
    _id:"electronics"   
});


//connect to db
mongoose.connect(url,(err)=>{
    if(err)
        {
            console.log("unable to connect db",err);
        }

});


//saving the electronics
//electronics.save((err)=>{
//    if(err)
//        {
//            console.log(err);
//        }
//    else{
//         console.log("electronics created"); 
//         var laptop = new Category({
//             _id:"laptop",
//             parent:electronics._id,
//             ancestors:[electronics._id]
//         });
//
//        laptop.save((err)=>{
//            if(err) console.log(err);
//        });
//        
//    }
//    
//});


//retriving the data from the db
Category.find({},(err,docs)=>{
    if(err){
        console.log(err);
    }
    console.log(docs);
});