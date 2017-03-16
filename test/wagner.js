
var wagner = require("wagner-core");

function bacon(x1,x2){
//   return  "no bacon";
    return x1+x2;
    
}

// here function arguemnts must be wagner factory obj

wagner.factory("bacon",function(){
    return bacon;
});


wagner.factory("breakfast",function(bacon){
    console.log(bacon("sks","sks"));
    return bacon + " breakfast defn";
});

var result = wagner.invoke(function(breakfast){
    console.log(breakfast);
                       return breakfast;
                           });

//function sum(x)
//{
//    return x+10;
//}
//
//function minus(x,y)
//{
//    return x-y;
//}
//
//wagner.factory("sum1",()=>{
//    return sum;
//});
//
//wagner.factory("minus1",()=>{
//    return minus;
//});
//
//// to access factory defined f,
//// pass the factory functions as arguments
//
//wagner.invoke((minus1,sum1)=>{
//    console.log(minus1(1,2)+sum1(1,2));
//});


