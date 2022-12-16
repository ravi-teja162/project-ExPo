const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const schema = mongoose.Schema;

const teamSchema = new Schema({

    teamName: String,
    image: String,
    posts: [{
        type: schema.Types.ObjectId,
        ref: 'Post'
    }],
    mates: [{
        type: schema.Types.ObjectId,
        ref: 'User'
    }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Team', teamSchema);
