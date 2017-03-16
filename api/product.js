//this js file returns a new route object 
var express = require("express");
var wagner = require("wagner-core");
var httpStatus = require("http-status");

//http://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get

var productApi = function(collectionProduct)
{
    var api = express.Router();   
    api.get("/productName/:productName",function(req,res){
//      retrieve product info
        collectionProduct.findOne({name:req.params.productName},function(err,product){
          if(err)
              {
                  res.status(httpStatus.INTERNAL_SERVER_ERROR);
                  res.send("internal error");
              }
          else if(!product)
              {
                  res.status(httpStatus.OK);
                  res.send("no product found");
              }
          else
              {
                  res.status(httpStatus.OK);
                  res.send(JSON.stringify(product));
              }
 
      });
  });
    
    return api;
}

//passing a function
module.exports=productApi;


