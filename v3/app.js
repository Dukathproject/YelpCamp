var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");



//----------------------------
//ejs extension cut
app.set("view engine", "ejs");
//use body-parser
app.use(bodyParser.urlencoded({extended: true}));
//Declare Atlas address
const mongoDb_URI = "mongodb+srv://dukathTest:DukathProject1234@clustermongo-vw7vk.mongodb.net/yelp_camp?retryWrites=true&w=majority";
//Connect to mongo db atlas  | || "mongodb://localhost/cat_app"| "mongodb://localhost/cat_app"
mongoose.connect(mongoDb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Check message
mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!");
});

//INITIALIZE SEED TO ADD AND DELETE CAMPS
seedDB();
//----------------------------

//----------------------------
//ROUTES
//home
app.get("/", function(req, res){
    res.render("landing");
});

//view all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});

        }
    })
});

//submit campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

//CREATE CAMPGROUND BY FORM
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});   
//----------------------------


//----------------------------
//server listen
app.listen(3000, function(req, res) {
    console.log("YelpCamp server has started!");
});//----------------------------