var e=require("express");
var app= e();
app.set("view engine","ejs");
var mongoose= require("mongoose");
mongoose.connect('mongodb://localhost:27017/todolist',{useNewUrlParser:true, useUnifiedTopology:true});
var bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var userschema= new mongoose.Schema({
    Name:String,
    id:{type: mongoose.Schema.Types.ObjectId}
});

var user= mongoose.model("user",userschema);

var methodoverride = require("method-override");
app.use(methodoverride("_method"));


app.get("/",function(req,res){
    res.redirect("/list");
});
app.get("/add",function(req,res){
    res.render("add");
});
app.post("/add",function(req,res){
    var newus= new user({Name: req.body.Name});
    user.create(newus,function(){
        res.redirect("/list");  
    })
});
app.get("/list",function(req,res){
    user.find({},function(err,f){
        res.render("list.ejs",{theuser:f});
    });
});


app.get("/list/:id/delete",function(req,res){
    user.findByIdAndRemove(req.params.id, function(err){
        res.redirect("/list");
    })
});





app.get("/list/:id/edit",function(req,res){
    user.findById(req.params.id,function(err,c){
        if(err){
            console.log("Error");
        }
        else{
            res.render("edit",{user:c});
        }
    })
    
});



app.put("/list/:id",function(req,res){
   user.findByIdAndUpdate(req.params.id,req.body.user,function(err,up){
        res.redirect("/list");
    });
});

app.listen(3000,() => console.log("Running on port 3000"));




