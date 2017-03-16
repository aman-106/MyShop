var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var category = require("./schemas/category.js").category;
var productSch= require("./schemas/product.js").product;
var user = require("./schemas/user.js").user;

var url = "mongodb://localhost:27017/newshop";

var Category = mongoose.model("Category",category);
var Product = mongoose.model("Product",productSch);
var User = mongoose.model("User",user);
  
mongoose.connect(url,(err)=>{
	if(err)
	{
		console.log(err);
	}

});

//saving the user
var me = {
    name:"aman",
    data:{
        oauth:"aman123"
    }
}

function addUser(user)
{
    var newUser = new User(user);
    newUser.save((err)=>{
        if(err)
            {
                console.log(err);
            }
        console.log("user saved");
    });
}

//addUser(me);

function addProductForUser(userName,productId)
{
//    {$set: {'anotherdoc.something': 'somenewval'}}
    var query={name:userName},
        update={$set:{"data.cart.product":productId}},
        options={multi:false};
    function status()
    {
        console.log("updated");
    }
    User.update(query,update,options,status);
}


//Product.findOne({name:"redmi note 4"})
//.exec()
//using exec  on query return a promise
//queryProduct("redmi note 4")
//.then((product)=>{
//    console.log("promise",product);
//    addProductForUser("aman",product._id);
//});


//addProductForUser("aman",);
function getUser(username,productName,addProductForUser)
{
//    find user
    User.findOne({name:username},(err,user)=>{
        if(err)
            {
                console.log(err);
            }
        console.log(user);      
//        find product
        Product.findOne({name:productName},(err,product)=>{
            if(err)
            {
                console.log(err);
            }
            
            addProductForUser();
        });
        
        
    });
}

//remove all docs
function removeAll(model)
{
    model.remove({},(err,docs)=>{
        if(err)
            {
                console.log(err);
            }
        console.log("removed");
    }).exec();
}
//removeAll(Product);

function getCategoryOfProduct(newProduct,addProduct)
{
    Category.findOne({_id:"android"},(err,doc)=>{
        if(err)
            {
                console.log(err);
            }
        console.log(doc);
        addProduct(newProduct,doc); 
// doc is "category" model  for embedded schema
// doc._id in case of using ref  
    });
}

function getProduct(productName)
{
    Product.findOne({name:productName},(err,product)=>{
        if(err)
            {
                console.log(err);
            }
        
    });
}

function queryProduct(productName)
{
   return Product.findOne({name:productName}).exec(); 
}

function addProduct(newProduct,productCategory)
{
    newProduct.category=productCategory;
    var product  = new Product(newProduct);
    product.save((err)=>{
        if(err)
            {
                console.log(err);
            }
        console.log("saved");
    });
}

var newProduct= {
    name:"redmi note 4",
    picture:"http://candytech.in/wp-content/uploads/2016/01/Xiaomi-Redmi-3-Snapdragon-Version4.jpg",
    price:{
            amount:12000,
            currency:"inr"
          },
//    category:productCategory
//        price.currency="inr"
//        category:productCategory.
};

//getCategoryOfProduct(newProduct,addProduct);

//addProduct("ssj");

// adding new docs 
// by getting parent doc and using the parent id for insertion 
//Category.findOne({_id:"electronics"},(err,doc)=>{ //doc === electronics
//    if(err)
//        {
//            console.log(err);
//        }
//    
//    var mobile = new Category({
//        _id:"mobile"
//    });
//    
//    var ios = new Category({
//        _id:"ios"
//    });
//    
//    var android = new Category({
//        _id:"android"
//    });
//    
//    mobile.parent = doc._id;
//    mobile.ancestors=[doc._id];
//    mobile.save((err)=>{
//        if(err) { console.log(err);}
//        
//        ios.parent=mobile._id;
//        ios.ancestors=[mobile._id];
//        
//        android.parent=mobile._id;
//        android.ancestors=[mobile._id];
//        
//        ios.save((err)=>{
//            if(err) console.log(err);
//        });
//        
//        android.save((err)=>{
//            if(err) console.log(err);
//        });
//    })
//    
//});
        


// getting the docs from the db
function findDoc(model,idValue)
{
    model.find({_id:idValue},(err,docs)=>{
        if(err){
            console.log(err);
        }
        console.log("docs",docs);
    });
}

//findDoc(Category,"electronics");

//getting the info of fields and the value its points to.
//eg get laptop.parent details
function getCategoryParentId(model,idValue)
{
    model.findOne({_id:idValue}).
    populate("parent").           // only for ref fields
    exec((err,category)=>{
        if(err) console.log(err);
        console.log("required",category.parent._id);
//        return category.parent._id;
    });
}


//console.log(getCategoryParentId(Category,"laptop"));
//setInterval(()=>{
//    console.log("id",xx);
//},2000);

//update the fields of doc
function updateDoc(model,idValue,fieldValue)
{
    var query={_id:idValue},
        update={ancestors:fieldValue},
        options={multi:false};
    function callback()
    {
        console.log("updated");
    }
    
//    http://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
    model.update(query,update,options,callback);
}

//updateDoc(Category,"android",['mobile','electronics']);
//updateDoc(Category,"ios",['mobile','electronics']);


//display docs 
setInterval(()=>{
    allDocs(User);
},2000);

//populate ref in nested in sub docs
//must see nested populate

//setInterval(()=>{
//    
//    User.findOne({name:"aman"})
//        .populate("data.cart.product")
//        .exec((err,docs)=>{
//        if(err)
//            {
//                console.log("err",err);
//            }
//         console.log(docs.data.cart.product);
//        });
//},2000)



function allDocs(collection)
{
   collection.find({},(err,docs)=>{   // docs is array of objects using                                       find
    if(err)
        {
            console.log(err);
        }
    console.log(docs); 
   }); 
}

function getFieldValue(collection,idValue,field)
{
    collection.find({name:idValue})
        .populate(field)
        .exec((err,docs)=>{
        if(err)
            {
                console.log(err);
            }
        console.log(docs);
        });
}

//setInterval(()=>{
//    getFieldValue(User,"aman","data.cart.product");
//},2000)

