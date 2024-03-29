var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//----------------------------
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
});

//submit campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//CREATE CAMPGROUND BY FORM
router.post("/", function(req, res){
    //get data from the form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //Create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //finally redirect to campgrounds to show added campground
            res.redirect("/campgrounds");
        }
    });
});

//SHOW MORE INFO ABOUT CAMPGROUNDS
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//----------------------------

module.exports = router;