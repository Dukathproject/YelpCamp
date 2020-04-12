var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require ("./models/user"),
    seedDB        = require("./seeds");



//----------------------------
//get logged in name from session
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
//ejs extension cut
app.set("view engine", "ejs");
//use custom css
app.use(express.static(__dirname + "/public"));
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


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is the first complete app i'm doing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//INITIALIZE SEED TO ADD AND DELETE CAMPS
//seedDB();
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
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
});

//submit campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
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
            //console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//----------------------------
//COMMENTS ROUTES
//----------------------------
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    })
});
//AUTH ROUTES
app.get("/register", function(req, res){
    res.render("register");
});
//Handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//show login form
app.get("/login", function(req, res){
    res.render("login");
});
//handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),  function(req, res){
});

//logout route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

//----------------------------

//----------------------------
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//----------------------------

//----------------------------
//server listen
app.listen(3000, function(req, res) {
    console.log("YelpCamp server has started!");
});//----------------------------