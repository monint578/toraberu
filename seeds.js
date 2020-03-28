//Setup
var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
// var Comment     = require("./models/comment");

//Seed campgrounds
var data = [
  {
    name        : "Forest",
    image       : "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description : "Camping in forest! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name        : "Mountain",
    image       : "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description : "Camping in mountain! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name        : "Fish Eye",
    image       : "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description : "Camping in fish eyed forest! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

//seedDB - Clear all campgrounds from DB and add seed campgrounds
function seedDB(){
  Campground.remove({}, function(err){
    if(err) {
      console.log("Something went wrong with removing all campgrounds.");
      console.log(err);
    } else {
      console.log("All campgrounds have been removed from database.");
      data.forEach(function(data){
        Campground.create(data, function(err, seedCampground){
          if(err) {
            console.log("Something went wrong with adding seed campgrounds.");
            console.log(err);
          } else {
            console.log("Seed campground has been added.");
            // Comment.create({
            //   text    : "Seed comment for this campground.",
            //   author  : "John"
            // }, function(err, seedComment){
            //   if(err) {
            //     console.log("Something went wrong with adding seed comments.");
            //     console.log(err);
            //   } else {
            //     seedCampground.comments.push(seedComment);
            //     seedCampground.save();
            //     console.log("Seed comment has been added.");
            //   }
            // });
          }
        });
      });
    }
  });
}

//Export seedDB
module.exports = seedDB;