var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 
var UserSchema = new mongoose.Schema({
    user: String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: String,
    avatarImage: String,
    description: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);