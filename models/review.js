const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reviewSchema = new Schema({

    body: String,
    author: [{
        type: schema.Types.ObjectId,
        ref: 'User'
    }]
});



module.exports = mongoose.model('post', reviewSchema);
