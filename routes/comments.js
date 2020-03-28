var express = require("express");
var router = express.Router({mergeParams: true});
var Kruva = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
	Kruva.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

//comments create
router.post("/", middleware.isLoggedIn, function(req, res){
	Kruva.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, newComment){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					//save comment
					newComment.save();
					campground.comments.push(newComment);
					campground.save();
					req.flash("success", "Successfully added comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});	
});
//EDIT COMMENTS
router.get("/:comment_id/edit", middleware.chechCommentsOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});
//UPTADE edit comments
router.put("/:comment_id", middleware.chechCommentsOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back")
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DELETE COMMENTS ROUTE
router.delete("/:comment_id", middleware.chechCommentsOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comments deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;