var express = require("express");
var router = express.Router({ mergeParams: true });
var Content = require("../models/content");
var Review = require("../models/review");
var middleware = require("../middleware");

// Reviews Index
router.get("/", function(req, res) {
  Content.findById(req.params.id)
    .populate({
      path: "reviews",
      options: { sort: { createdAt: -1 } } // sorting the populated reviews array to show the latest first
    })
    .exec(function(err, content) {
      if (err || !content) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      res.render("reviews/index", { content: content });
    });
});

// Reviews New
router.get("/new", middleware.isLoggedIn, middleware.checkReviewExistence, function(req, res) {
    // middleware.checkReviewExistence checks if a user already reviewed the content, only one review per user is allowed
    Content.findById(req.params.id, function(err, content) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      res.render("reviews/new", { content: content });
    });
  }
);

// Reviews Create
router.post("/", middleware.isLoggedIn, middleware.checkReviewExistence, function(req, res) {
    //lookup content using ID
    Content.findById(req.params.id).populate("reviews").exec(function(err, content) {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("back");
        }
        Review.create(req.body.review, function(err, review) {
          if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
          }
          //add author username/id and associated content to the review
          review.author.id = req.user._id;
          review.author.username = req.user.displayName;
          review.content = content;
          //save review
          review.save();
          content.reviews.push(review);
          // calculate the new average review for the content
          content.rating = calculateAverage(content.reviews);
          //save content
          content.save();
          req.flash("success", "Your review has been successfully added.");
          res.redirect("/places/" + content._id);
        });
      });
  }
);

// EDIT REVIEWS
router.get("/:review_id/edit", middleware.checkReviewOwnership, function(
  req,
  res
) {
  Review.findById(req.params.review_id, function(err, foundReview) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("back");
    }
    res.render("reviews/edit", {
      content_id: req.params.id,
      review: foundReview
    });
  });
});

// Reviews Update
router.put("/:review_id", middleware.checkReviewOwnership, function(req, res) {
  Review.findByIdAndUpdate(
    req.params.review_id,
    req.body.review,
    { new: true },
    function(err, updatedReview) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      Content.findById(req.params.id)
        .populate("reviews")
        .exec(function(err, content) {
          if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
          }
          // recalculate content average
          content.rating = calculateAverage(content.reviews);
          //save changes
          content.save();
          req.flash("success", "Your review was successfully edited.");
          res.redirect("/places/" + content._id);
        });
    }
  );
});

// // Reviews Delete
// router.delete("/:review_id", middleware.checkReviewOwnership, function (req, res) {
//     Review.findByIdAndRemove(req.params.review_id, function (err) {
//         if (err) {
//             req.flash("error", err.message);
//             return res.redirect("back");
//         }
//         Content.findByIdAndUpdate(req.params.id, {$pull: {reviews: req.params.review_id}}, {new: true}).populate("reviews").exec(function (err, content) {
//             if (err) {
//                 req.flash("error", err.message);
//                 return res.redirect("back");
//             }
//             // recalculate content average
//             content.rating = calculateAverage(content.reviews);
//             //save changes
//             content.save();
//             req.flash("success", "Your review was deleted successfully.");
//             res.redirect("/places/" + req.params.id);
//         });
//     });
// });

function calculateAverage(reviews) {
  if (reviews.length === 0) {
    return 0;
  }
  var sum = 0;
  reviews.forEach(function(element) {
    sum += element.rating;
  });
  return sum / reviews.length;
}

module.exports = router;
