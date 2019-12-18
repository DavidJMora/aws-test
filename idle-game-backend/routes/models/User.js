const mongoose = require('mongoose');
const Schema = mongoose.Schema

let UserSchema = new Schema({
    username: { type: String, unique: true, default: '' },
    password: { type: String, default: '' }
})

module.exports = mongoose.model("User", UserSchema);