var mongoose = require('mongoose');

var commentUserVoteSchema = mongoose.Schema({
    commentId : String,
    userId  : String,
    Vote  : Number,
});

module.exports = mongoose.model('CommentUserVote', commentUserVoteSchema);