var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

//router.get('/feed', isLoggedIn, function(req, res) {
//  res.render('feed.ejs', { user: req.user });
//});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/feed',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/feed',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/getpost',function(req,res){


    mongoose.model('Post').find( function(err,posts){
        res.json(posts);
    });
});

router.post('/voteIncrement', function(req,res){

    var postId = req.body.id;
    //var userId = req.body.userId;

    var query = { _id : postId};

    mongoose.model('Post').findOne(query , function(err,post){
        post.postVotes = post.postVotes + 1;
        post.save();
        res.json(post);
    })
});

router.post('/voteDecrement', function(req,res){

    var postId = req.body.id;
    //var userId = req.body.userId;

    var query = { _id : postId};

    mongoose.model('Post').findOne(query , function(err,post){
        post.postVotes = post.postVotes - 1;
        post.save();
        res.json(post);
    })
});

router.post('/getComments', function(req, res){

    var postId = req.body.id;

    var query = {'commentedOnPost' : postId};     //check if quotes required

    mongoose.model('Comment').find(query, function(err,comments){
        res.json(comments);
    });
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
    },function (err, doc) {
        if (err) {
          // If it failed, return error
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
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}