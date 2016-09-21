var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/', isLoggedIn , function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login.html', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/feed',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.get('/signup', function(req, res) {
  res.render('signup.html', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/feed',
    failureRedirect: '/signup',
    failureFlash: true,
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/getPosts',function(req,res){
    mongoose.model('Post').find( function(err,posts){
        res.json(posts);
    }).sort({postVotes: -1});
});

router.post('/getPost', function(req,res){
    var postId = req.body.postId;
    var query = {_id : postId};

    mongoose.model('Post').findOne(query, function(err,post){
       res.json(post);
    });
});

router.post('/checkPostVoted' , function(req,res){
    var postId = req.body.postId;
    var userId = req.body.userId;
    var query = {'postId' : postId , 'userId' : userId};

    mongoose.model('PostUserVote').findOne(query, function(err, result){

        var val;
        if(!result){
            val = 0;
        }
        else{
            if(result.Vote == 1){
                val = 1;
            }
            else if(result.Vote == -1){
                val = -1;
            }
        }
        res.json(val);
    });
});

router.post('/postVoteIncrement', function(req,res){
    var postId = req.body.postId;
    var userId = req.body.userId;
    var query = { _id : postId};
    var incrementBy = 0;
    var queryUserPostDatabase = {'postId' : postId , 'userId' : userId};

    mongoose.model('PostUserVote').findOne(queryUserPostDatabase , function (err,result) {

        if(result){
            if(result.Vote == 1){
                incrementBy = -1;
                mongoose.model('PostUserVote').remove(queryUserPostDatabase , function(err){
                    if(err) throw err;
                });
            }
            else if(result.Vote == -1){
                incrementBy = 2;
                result.Vote = 1;
                result.save();
            }

        }
        else{
            incrementBy = 1;
            mongoose.model('PostUserVote').create({
                "userId" : userId,
                "postId" : postId,
                "Vote" : 1
            });
        }
        mongoose.model('Post').findOne(query , function(err,post){

            post.postVotes = post.postVotes + incrementBy;
            post.save();
            res.json(post);
        });
    });
});

router.post('/postVoteDecrement', function(req,res){

    var postId = req.body.postId;
    var userId = req.body.userId;
    var query = { _id : postId};
    var queryUserPostDatabase = {'postId' : postId , 'userId' : userId};
    var decrementBy = 0;

    mongoose.model('PostUserVote').findOne(queryUserPostDatabase , function (err,result) {

        if(result){
            if(result.Vote == -1){
                decrementBy = -1;
                mongoose.model('PostUserVote').remove(queryUserPostDatabase , function(err){
                    if(err) throw err;
                });
            }
            else if(result.Vote == 1){
                decrementBy = 2;
                result.Vote = -1;
                result.save();
            }
        }
        else{
            decrementBy = 1;
            mongoose.model('PostUserVote').create({
                "userId" : userId,
                "postId" : postId,
                "Vote" : -1
            });
        }
        mongoose.model('Post').findOne(query , function(err,post){
            post.postVotes = post.postVotes - decrementBy;
            post.save();
            res.json(post);
        });
    });
});

router.post('/checkCommentVoted' , function(req,res){
    var commentId = req.body.commentId;
    var userId = req.body.userId;
    var query = {'commentId' : commentId , 'userId' : userId};

    mongoose.model('CommentUserVote').findOne(query, function(err, result){
        var val;
        if(!result){
            val = 0;
        }
        else{
            if(result.Vote == 1){
                val = 1;
            }
            else if(result.Vote == -1){
                val = -1;
            }
        }
        res.json(val);
    });
});

router.post('/commentVoteIncrement' , function (req,res) {

    var commentId = req.body.commentId;
    var userId = req.body.userId;
    var query = {_id : commentId};
    var incrementBy = 0;
    var queryUserCommentDatabase = {'commentId' : commentId , 'userId' : userId};

    mongoose.model('CommentUserVote').findOne(queryUserCommentDatabase , function (err,result) {
        if(result){
            if(result.Vote == 1){
                incrementBy = -1;
                mongoose.model('CommentUserVote').remove(queryUserCommentDatabase , function(err){
                    if(err) throw err;
                });
            }
            else if(result.Vote == -1){
                incrementBy = 2;
                result.Vote = 1;
                result.save();
            }
        }
        else{
            incrementBy = 1;
            mongoose.model('CommentUserVote').create({
                "userId" : userId,
                "commentId" : commentId,
                "Vote" : 1
            });
        }
        mongoose.model('Comment').findOne(query , function(err,comment){
            comment.commentVotes = comment.commentVotes + incrementBy;
            comment.save();
            res.json(comment);
        });
    });
});

router.post('/commentVoteDecrement', function(req,res){

    var commentId = req.body.commentId;
    var userId = req.body.userId;
    var query = { _id : commentId};
    var queryUserCommentDatabase = {'commentId' : commentId , 'userId' : userId};
    var decrementBy = 0;

    mongoose.model('CommentUserVote').findOne(queryUserCommentDatabase , function (err,result) {
        if(result){
            if(result.Vote == -1){
                decrementBy = -1;
                mongoose.model('CommentUserVote').remove(queryUserCommentDatabase , function(err){
                    if(err) throw err;
                });
            }
            else if(result.Vote == 1){
                decrementBy = 2;
                result.Vote = -1;
                result.save();
            }
        }
        else{
            decrementBy = 1;
            mongoose.model('CommentUserVote').create({
                "userId" : userId,
                "commentId" : commentId,
                "Vote" : -1
            });
        }
        mongoose.model('Comment').findOne(query , function(err,comment){
            comment.commentVotes = comment.commentVotes - decrementBy;
            comment.save();
            res.json(comment);
        });
    });
});

router.post('/getComments', function(req, res){

    var postId = req.body.id;
    var query = {'commentedOnPost' : postId};
    mongoose.model('Comment').find(query, function(err,comments){
        res.json(comments);
    }).sort({commentVotes: -1});
});

router.post('/postComment', function(req, res){

    var commentedOnPost = req.body.commentedOn;
    var commentText = req.body.commentedText;
    var commentedByID = req.body.commentedBy;
    var commentedByName = req.body.commentedByName;
    var commentVotes = 0;
    var commentDate = getdate();

    mongoose.model('Comment').create({
        "commentedOnPost" : commentedOnPost,
        "commentText"  : commentText,
        "commentedByID"  : commentedByID,
        "commentedByName" : commentedByName,
        "commentVotes" : commentVotes,
        "commentDate"  : commentDate
    },function (err) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.json("");
        }
    });
});

module.exports = router;

function getdate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var min = today.getMinutes();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    return mm.toString() +'/'+dd.toString()+'/'+yyyy.toString() + ' ' + hour.toString() + ':' + min.toString();
}

function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
        return next();
  }
  res.redirect('/feed');
}