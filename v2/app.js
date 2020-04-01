var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

//----------------------------
//ejs extension cut
app.set("view engine", "ejs");

//use body-parser
app.use(bodyParser.urlencoded({extended: true}));
//----------------------------


//----------------------------
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
//----------------------------


//----------------------------
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
//MODEL SETUP
var Campground = mongoose.model("Campground", campgroundSchema);
//----------------------------


//----------------------------
//CAMPGROUND CREATE
// Campground.create(
//     {
//         name: "Granite Hill",
//         image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     })
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
            res.render("campgrounds", {campgrounds: allCampgrounds});

        }
    })
});

//submit campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});
//----------------------------


//----------------------------
//POSTS
app.post("/campgrounds", function(req, res){
    //get data from the form
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
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
//----------------------------


//----------------------------
//server listen
app.listen(3000, function(req, res) {
    console.log("YelpCamp server has started!");
});//----------------------------