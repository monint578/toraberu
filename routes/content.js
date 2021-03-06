var express = require("express");
var router = express.Router({ mergeParams: true });
var Content = require("../models/content");
var middleware = require("../middleware");
var Review = require("../models/review");

//INDEX - show all content
router.get("/", function (req, res) {
  Content.find({}, function (err, allContents) {
    if (err) {
      console.log(err);
    } else {
      res.render("content/content", { content: allContents, currentUser: req.user });
    }
  });
});

//CREATE - add new content to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
  // get data from form and add to content array
  var name = req.body.content.name;
  var desc = req.body.content.description;
  var location = req.body.content.location;
  var images = req.body.images;

  var author = {
    id: req.user._id,
    username: req.user.displayName,
  };
  var newContent = {
    name: name,
    location: location,
    images: images,
    description: desc,
    author: author,
  };
  Content.create(newContent, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      req.flash(
        "success",
        "Hurray, you just add a new Unbelievable places for you and others!"
      );
      res.redirect("/places");
    }
  });
});

//NEW - show form to create new content
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("content/new");
});

// SHOW - shows more info about one content
router.get("/:id", function (req, res) {
  //find the content with provided ID
  Content.findById(req.params.id)
    .populate("comments")
    .populate({
      path: "reviews",
      options: { sort: { createdAt: -1 } },
    })
    .exec(function (err, foundContent) {
      if (err) {
        console.log(err);
      } else {
        //render show template with that content
        res.render("content/show", { content: foundContent, currentUser: req.user });
      }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.chechContentOwnership, function (req, res) {
  Content.findById(req.params.id, function (err, foundContent) {
    res.render("content/edit", { content: foundContent });
  });
});

//UPDATE CAMPGROUD ROUTE
router.put("/:id", middleware.chechContentOwnership, function (req, res) {
  Content.findByIdAndUpdate(req.params.id, req.body.content, req.body.images, function (err, updatedContent) {
    if (err) {
      req.flash("error", "Something then wrong");
      res.redirect("/places");
    } else {
      res.redirect("/places/" + req.params.id);
    }
  });
});
// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.chechContentOwnership, function (req, res) {
  Content.findByIdAndDelete(req.params.id, req.body.content, function (
    err,
    Upcontent
  ) {
    if (err) {
      res.redirect("/places");
    } else {
      res.redirect("/places");
    }
  });
});

module.exports = router;
