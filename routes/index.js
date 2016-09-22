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
    checkVoted(query , 'PostUserVote' , res);
});

router.post('/checkCommentVoted' , function(req,res){
    var commentId = req.body.commentId;
    var userId = req.body.userId;
    var query = {'commentId' : commentId , 'userId' : userId};
    checkVoted(query , 'CommentUserVote' , res);
});

router.post('/postVoteIncrement', function(req,res){
    updatePostVote(1,-1,req,res);
});

router.post('/postVoteDecrement', function(req,res){
    updatePostVote(-1,1,req,res);
});

router.post('/commentVoteIncrement' , function (req,res) {
    updateCommentVote(1,-1,req,res);
});

router.post('/commentVoteDecrement', function(req,res){
    updateCommentVote(-1,1,req,res);
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

function checkVoted(query , model , res){
    mongoose.model(model).findOne(query, function(err, result){
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
}

function updatePostVote(a , b , req, res){
    var postId = req.body.postId;
    var userId = req.body.userId;
    var query = { _id : postId};
    var queryUserPostDatabase = {'postId' : postId , 'userId' : userId};
    updateDatabase('PostUserVote' , 'Post' , queryUserPostDatabase , query , a , b , res);
}

function updateCommentVote(a,b,req,res){
    var commentId = req.body.commentId;
    var userId = req.body.userId;
    var query = {_id : commentId};
    var queryUserCommentDatabase = {'commentId' : commentId , 'userId' : userId};
    updateDatabase('CommentUserVote' , 'Comment' , queryUserCommentDatabase , query , a , b , res);
}

function updateDatabase(UserModel , DomModel , queryUser , queryDom , a , b , res){
    var changeBy = 0;
    mongoose.model(UserModel).findOne(queryUser , function (err,result) {
        if(result){
            if(result.Vote == a){
                changeBy = b;
                mongoose.model(UserModel).remove(queryUser , function(err){
                    if(err) throw err;
                });
            }
            else if(result.Vote == b){
                changeBy = a*2;
                result.Vote = a;
                result.save();
            }
        }
        else{
            changeBy = a;
            mongoose.model(UserModel).create({
                "userId" : userId,
                "postId" : postId,
                "Vote" : a
            });
        }
        mongoose.model(DomModel).findOne(queryDom , function(err,post){

            post.postVotes = post.postVotes + changeBy;
            post.save();
            res.json(post);
        });
    });
}

function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
        return next();
  }
  res.redirect('/feed');
}