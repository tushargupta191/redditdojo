var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    postTitle : String,
    postText  : String,
    postedByID  : String,
    postedByName : String,
    postVotes : Number,
    postDate  : String
});

module.exports = mongoose.model('Post', postSchema);