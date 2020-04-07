//----------------------------
var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
//----------------------------

//----------------------------
var data = [
    {
        name: "Cloud's Rest",
        image: "https://campone.com/wp-content/uploads/2017/12/FB_IMG_1537891494422.jpg",
        description: "So beautiful!"
    },
    {
        name: "Desert Mesa",
        image: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
        description: "So beautiful!"
    },
    {
        name: "Canyon Floor",
        image: "https://cdn.jacksonholewy.net/images/content/14405_832ba2_gros_ventre_campground_lg.jpg",
        description: "So beautiful!"
    },
]
//----------------------------

//----------------------------
function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        //Remove all comments
        Comment.deleteMany({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments");
        });
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create({
                        text: "This place is great, but i wish there was internet",
                        author: "Homer"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                    }
                });
                }
            });
        });
    });   
}
//----------------------------

//----------------------------
module.exports = seedDB;
//----------------------------