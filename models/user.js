const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({

    email : { type: String, unique: true, required: true },
    username: String,
    fullName : String,
    contact: {
        linkedIn : String,
        instagram : String,
        github  : String
    },
    profilePic : [{ url: String, public_id: String }],
    gender: String,
    role: String,
    dept: String,
    location: String,
    about: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
