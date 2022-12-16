const mongoose = require('mongoose');
const schema = mongoose.Schema;


const postSchema = new schema({

    caption: String,
    images: [{ url: String, public_id: String }],
    tumbnail: { url: String, public_id: String },
    description: String,
    name: String,
    typeOf: String,
    status: String,
    linkType: String,

    link: String,
    // event
    startDate: String,
    endDate: String,
    branch: String,
    regLink: String,

    // paper
    topic: String,
    publisher: String,

    reviews: [{
        type: schema.Types.ObjectId,
        ref: 'Review'
    }],
    author: {
        type: schema.Types.ObjectId,
        ref: 'User'
    }
});



module.exports = mongoose.model('Post', postSchema);
