const express= require("express");
const port= 8000;
const path= require("path");

const db = require("./config/mongoose");

const Contact = require("./models/contact");

const app= express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// 2.add paser(middleware)
app.use(express.urlencoded());

app.use(express.static("assets"));

// middleware 1
// app.use(function(req,res,next){
   // console.log("middleware 1 called");
//    req.myName="gracy";
    // next();
// });

// middleware 2
// app.use(function(req,res,next){
    // console.log("my name from mw2",req.myName);
   // console.log("middleware 2 called");
    // next();
// });

var contactList= [
    {
        name: "grey",
        phone: "6473437474"
    },
    {
        name:"tony",
        phone: "63266263634"
    }
]




app.get("/",function(req,res){
    //console.log(__dirname);
    //res.send("cool its running");
    // console.log("from get route controller:",req.myName);

    // fetching data from DB
     Contact.find({}, function(err,contacts){
         if(err)
         {
             console.log("error in fetching contacts from DB");
             return;
         }
         return res.render("home",{
             title:"Contacts List",
             contact_list: contacts

         });

     });



    // return res.render("home",{
        // title:"CONTACTS LIST",   (comment-copy paste above)
        // contact_list: contactList
    // });
});

app.get("/practice",function(req,res){
    
    return res.render("practice",{title:"play with ejs"});
});

// 1.create controller or call back function for form

app.post("/create-contacts",function(req,res){
   // return res.redirect("/practice");
//    console.log(req.body);
//    console.log(req.body.name);
//    console.log(req.body.phone);

// 3.push(add/append) parsed data in contact list(array)
// contactList.push({
    // name:req.body.name,
    // phone:req.body.phone
//    });

    // contactList.push(req.body);
//  comment above to push into DB & not in contact list

// populating the DB
Contact.create({
    name:req.body.name,
    phone:req.body.phone
}, function(err,newContact){
    if(err){
        console.log("error in creating a contact!");
        return;
    }
    console.log("********",newContact);
    return res.redirect("back");
});

//   return res.redirect("back");   (comment)

});

// controller for deleting contact

app.get("/delete-contact/",function(req,res){
    console.log(req.query);

    // get the query from the url
    //   let phone=req.query.phone; (below)

          //   deleting from DB

        // get the id from query in the url
    let id=req.query.id;

          // find the content in the database using id and delete

    // let contactIndex=contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    // contactList.splice(contactIndex,1);
    // }
        Contact.findByIdAndDelete(id,function(err){
            if(err){
                console.log("error in deleting an object from DB");
                return;
            }
            return res.redirect("back");
        });
        // return res.redirect("back");
});





app.listen(port,function(err){
    if (err)
    {
        console.log("error is occuring",err)
    }
    console.log("yup server is running on port:",port);
});