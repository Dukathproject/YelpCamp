//----------------------------
var mongoose = require("mongoose");
//----------------------------

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
//MODEL SETUP
module.exports = mongoose.model("Campground", campgroundSchema);
//----------------------------