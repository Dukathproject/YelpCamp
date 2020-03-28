var express = require("express");
var app = express();
var bodyParser = require("body-parser");


//temporal array
var campgrounds = [
    {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"},
    {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
    {name: "Granite Hill", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
    {name: "Granite Hill", image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
    {name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"},
    {name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
    {name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"},
    {name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"}
];


//ejs extension cut
app.set("view engine", "ejs");

//use body-parser
app.use(bodyParser.urlencoded({extended: true}));




//ROUTES

//home
app.get("/", function(req, res){
    res.render("landing");
});

//view all campgrounds
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

//submit campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});




//posts
app.post("/campgrounds", function(req, res){
    //get data from the form
    var name = req.body.name;
    var image = req.body.image;

    //push data to the database from a new object to the database array
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    
    //finally redirect to campgrounds to show added campground
    res.redirect("/campgrounds");

});




//server listen
app.listen(3000, function(req, res) {
    console.log("YelpCamp server has started!");
});