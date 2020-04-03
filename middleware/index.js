//ALL MIDDLEWARE GOES HERE
var middlewareObj = {};
var Content = require("../models/content");
var Comment = require("../models/comment");
var Review = require("../models/review");

//content middleware
middlewareObj.chechContentOwnership = function(req, res, next) {
	//is user logged in 
	if(req.isAuthenticated()){
		Content.findById(req.params.id, function (err, foundContent){
			if(err){
				req.flash("error", "Content not found");
				res.redirect("back");
			} else {
				//does user own the Contents?
				if(foundContent.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	//if not, redirect
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}		
}

//Comment middleware
middlewareObj.chechCommentsOwnership = function(req, res, next) {
	//is user logged in 
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Something went wrong");
				res.redirect("back");
			} else {
				//does user own the Contents?
				if(foundComment.author.id.equals(req.user.id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	//if not, redirect
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}		
};

//is logged in MIDDLEWARE
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
}

//REVIEWS MIDDLEWARE
middlewareObj.checkReviewOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Review.findById(req.params.review_id, function(err, foundReview){
            if(err || !foundReview){
                res.redirect("back");
            }  else {
                // does user own the comment?
                if(foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};
//checks if the user already reviewed the Content and disallows further actions if they did.
middlewareObj.checkReviewExistence = function (req, res, next) {
    if (req.isAuthenticated()) {
        Content.findById(req.params.id).populate("reviews").exec(function (err, foundContent) {
            if (err || !foundContent) {
                req.flash("error", "Content not found.");
                res.redirect("back");
            } else {
                // check if req.user._id exists in foundContent.reviews
                var foundUserReview = foundContent.reviews.some(function (review) {
                    return review.author.id.equals(req.user._id);
                });
                if (foundUserReview) {
                    req.flash("error", "You already wrote a review.");
                    return res.redirect("/places/" + foundContent._id);
                }
                // if the review was not found, go to the next middleware
                next();
            }
        });
    } else {
        req.flash("error", "You need to login first.");
        res.redirect("back");
    }
};

module.exports = middlewareObj;