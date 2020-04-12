//----------------------------
var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local"),
    Campground        = require("./models/campground"),
    Comment           = require("./models/comment"),
    User              = require("./models/user"),
    seedDB            = require("./seeds"),
    commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");
//----------------------------

//----------------------------
//get logged in name from session
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});



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
//use body-parser
app.use(bodyParser.urlencoded({extended: true}));
//ejs extension cut
app.set("view engine", "ejs");
//use custom css
app.use(express.static(__dirname + "/public"));

//----------------------------

//----------------------------
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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
//INITIALIZE SEED TO ADD AND DELETE CAMPS
//seedDB();
//----------------------------

//----------------------------
//activate routes from imported files
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
//----------------------------

//----------------------------
//server listen
app.listen(3000, function(req, res) {
    console.log("YelpCamp server has started!");
});
//----------------------------