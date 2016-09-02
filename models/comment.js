var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    commentedOnPost : String,
    commentText  : String,
    commentedByID  : String,
    commentedByName : String,
    commentVotes : Number,
    commentDate  : String,
});

module.exports = mongoose.model('Comment', commentSchema);