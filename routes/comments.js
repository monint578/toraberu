var express = require("express");
var router = express.Router({ mergeParams: true });
var Content = require("../models/content");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments index
router.get("/", function(req, res) {
  Content.findById(req.params.id)
    .populate({
      path: "comments",
      options: { sort: { createdAt: -1 } } // sorting the populated reviews array to show the latest first
    })
    .exec(function(err, content) {
      if (err || !content) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      res.render("comments/index", { content: content });
    });
});

//comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Content.findById(req.params.id, function(err, content) {
    if (err) {
      req.flash("error", err.message);
      console.log(err);
    } else {
      res.render("comments/new", { content: content });
    }
  });
});


//comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
  Content.findById(req.params.id).populate("comment").exec (function(err, content) {
    if (err) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Comment.create(req.body.comment, function(err, newComment) {
        if (err) {
          console.log(err);
        } else {
          //add username and id to comment
          newComment.author.id = req.user._id;
          newComment.author.username = req.user.username;
          newComment.content = content;
          //save comment
          newComment.save();
          content.comments.push(newComment);
          content.save();
          req.flash("success", "Successfully added comment");
          res.redirect("/places/" + content._id);
        }
      });
    }
  });
});
//EDIT COMMENTS
router.get("/:comment_id/edit", middleware.chechCommentsOwnership, function(
  req,
  res
) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        content_id: req.params.id,
        comment: foundComment
      });
    }
  });
});
//UPTADE edit comments
router.put("/:comment_id", middleware.chechCommentsOwnership, function(
  req,
  res
) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      req.flash("error", err.message);
      res.redirect("back");
    } Content.findById(req.params.id).populate("comment")
    .exec(function(err, content) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      content.save();
      req.flash("success", "Your comment was successfully edited.");
      res.redirect("/places/" + req.params.id);
    });
  });
});

//DELETE COMMENTS ROUTE
router.delete("/:comment_id", middleware.chechCommentsOwnership, function(
  req,
  res
) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comments deleted");
      res.redirect("/places/" + req.params.id);
    }
  });
});

module.exports = router;
