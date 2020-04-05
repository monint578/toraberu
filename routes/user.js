var express = require("express");
var router = express.Router({mergeParams: true});
var User= require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");
var multer = require("multer");

//MULTER - UPLOADING AN IMAGE NPM

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, req.params.currentUser_id)
      }
});
//nestorina filu kurie yra yra ne jpeg ir png
var fileFilter = (req, file, cb) => {
    //REJECT A FILE
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
var upload = multer({ storage: storage, fileFilter: fileFilter, limits: {fileSize: 1024 * 1024 *5} });

//SHOW USER PROFILE
router.get("/:currentUser_id", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id).exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render("user/profile", {user: foundUser});
        }
    });
});

//EDIT USER PROFILE ROUTE
router.get("/:currentUser_id/edit", middleware.isLoggedIn, function(req, res){
	User.findById(req.params.currentUser_id, function (err, foundUser){
        if(err) {
            res.redirect("back");
        } else {
        res.render("user/edit", {currentUser: foundUser});
        }
	});
});
//UPDATE USER PROFILE ROUTE + UPLOAD AVARTAS IMAGE
router.put("/:currentUser_id", middleware.isLoggedIn, function(req, res){
	User.findByIdAndUpdate(req.params.currentUser_id, req.body.currentUser, function(err, updatedUser){
		if(err){
			console.log(err);
		} else {
            res.redirect("/user/" + req.params.currentUser_id);
		}
	});
});

module.exports = router;