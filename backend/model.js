const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    dp : String,
}); 

module.exports = mongoose.model("UserProfile", userProfileSchema);