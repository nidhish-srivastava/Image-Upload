import mongoose from "mongoose"

const userProfileSchema = new mongoose.Schema({
    imageUrl : String,
    username : String
}); 

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile