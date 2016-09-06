var mongoose = require('mongoose');

var postUserVoteSchema = mongoose.Schema({
    postId : String,
    userId  : String,
    Vote  : Number,
});

module.exports = mongoose.model('PostUserVote', postUserVoteSchema);