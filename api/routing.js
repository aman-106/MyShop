var express = require("express");
var httpStatus = require("http-status");

var userApi = function(collectionUser)
{
    var api = new express.Router();
    api.get("/user/:userName",function(req,res){
        collectionUser.findOne({name:req.params.userName},function(err,user){
            docOne(err,user,res);
        });
    });
    
    return api;   
}

//reuse of Function using the bind if depend on the object
function docOne(err,user,res)
{
    if(err)
      {
          res.status(httpStatus.INTERNAL_SERVER_ERROR);
          res.send("internal error");
      }
    else if(!user)
      {
          res.status(httpStatus.OK);
          res.send("no product found");
      }
    else
      {
          res.status(httpStatus.OK);
          res.send(JSON.stringify(user));
      }
    
}

module.exports=function(wagner)
    {
        wagner.factory("userApi",function(){
            return userApi;
        });
    }
//function(wagner)
//{
//    wagner.invoke(function(User){
//        wagner.
//    });
//}
