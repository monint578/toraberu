var express = require("express");
var router = express.Router({mergeParams: true});
var User= require("../models/user");
var passport = require("passport");

router.get("/", function(req, res){
	res.render("landing");
});

//AUTH ROUTS

//show register form
router.get("/register", function(req, res){
	res.render("register");
});
//HANDLE SIGN UP LOGIC
router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register")
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});
//Login - handling the login logic
router.post("/login", passport.authenticate("local", {
  	successRedirect: "/campgrounds",
  	failureRedirect: "/login"
	}), function(req, res){
});
//log-out
router.get("/logout", function(req, res){
	req.logout();
	req.flash("error", "Logged you out");
	res.redirect("/campgrounds");
});

//is logged login
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;