//var schema = require("./schemas");
var mongoose = require("mongoose");
//var MongoClient  = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/person";
mongoose.Promise = global.Promise;
var  Schema = mongoose.Schema;
  
var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);


var aman = new Person({
    _id:9,
    name:"aman",
    age:23
});


//connect to db
mongoose.connect(url,(err)=>{
    if(err)
        {
            console.log("unable to connect db".err);
        }
    console.log("connected");

});

//aman.save((err)=>{
//    if(err)
//        {
//            console.log("unable to save aman");
//        }
//    else
//        {
//           console.log("aman doc saved"); 
//           var myStory = new Story({
//               _creator:aman._id,
//               title:"apple",
//           });
//            
//            myStory.save((err)=>{
//                if(err) console.log(err);
//            });
//        }
//                      
//});

Person.find({},(err,docs)=>{
    if(err)
        {
            console.log(err);
        }
    console.log("person: ",docs);
});

Story.find({},(err,docs)=>{
    if(err)
        {
            console.log(err);
        }
    console.log("story",docs);
});



