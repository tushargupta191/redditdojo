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
        res.status(200);
    })
});

router.post('/voteDecrement', function(req,res){

    var postId = req.body.id;
    //var userId = req.body.userId;

    var query = { _id : postId};

    mongoose.model('Post').findOne(query , function(err,post){
        post.postVotes = post.postVotes - 1;
        post.save();
        res.status(200);
    })
});



router.get('/checkVoteCount', function(req,res){

    var postId = req.body.postId;

    mongoose.model('Post').findOne({id: postId} , function(err, post){
        res.json(post);
    });

});


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}