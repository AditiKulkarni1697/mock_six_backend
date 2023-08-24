const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
 Username: String,
Avatar :String,
 Email:String,
Password:String
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {UserModel}