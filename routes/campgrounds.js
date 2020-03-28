var express = require("express");
var router = express.Router({mergeParams: true});
var Kruva = require("../models/campground");
var middleware = require("../middleware");
var Review = require("../models/review");

//INDEX - show all campgrounds
router.get("/", function(req, res){
	Kruva.find({}, function(err, allCampgrounds) {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/campgrounds", {sklypas: allCampgrounds});
		}
	});
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, price: price, description: desc, author: author}
	Kruva.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			req.flash("success", "Hurray, you just add a new campground!");
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function (req, res) {
    //find the campground with provided ID
    Kruva.findById(req.params.id).populate("comments").populate({
        path: "reviews",
        options: {sort: {createdAt: -1}}
    }).exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.chechCampgroundOwnership, function(req, res){
	Kruva.findById(req.params.id, function (err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
		});
});
//UPDATE CAMPGROUD ROUTE
router.put("/:id", middleware.chechCampgroundOwnership, function(req, res){
	Kruva.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds")
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
// // DESTROY CAMPGROUND ROUTE
// router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
//     Kruva.findById(req.params.id, function (err, campground) {
//         if (err) {
//             res.redirect("/campgrounds");
//         } else {
//             // deletes all comments associated with the campground
//             Comment.remove({"_id": {$in: campground.comments}}, function (err) {
//                 if (err) {
//                     console.log(err);
//                     return res.redirect("/campgrounds");
//                 }
//                 // // deletes all reviews associated with the campground
//                 // Review.remove({"_id": {$in: campground.reviews}}, function (err) {
//                 //     if (err) {
//                 //         console.log(err);
//                 //         return res.redirect("/campgrounds");
//                 //     }
//                 //     //  delete the campground
//                 //     campground.remove();
//                 //     req.flash("success", "Campground deleted successfully!");
//                 //     res.redirect("/campgrounds");
//                 // });
//             });
//         }
//     });
// });

module.exports = router;