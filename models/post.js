var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    postTitle : String,
    postText  : String,
    postedBy  : String,
    postVotes : String,
    postDate  : String,
});

module.exports = mongoose.model('Post', postSchema);