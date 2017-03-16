var express = require("express");
var wagner = require("wagner-core");
var app = express();


//get model and connect to db
//var product = require("./model.js").Product;


//while using the wagner no dependency on the variable declared for require();

//register a User model with wagner 
var User = require("./model.js").user(wagner);

//routing the request for product model
//var route = require("./product.js");
var route = require("./routing.js")(wagner);
//app.use(url,RouteObject);
app.use("/myapp/v1",wagner.invoke(function(User,userApi){
    return userApi(User);
}));

app.listen(2500);