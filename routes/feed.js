var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/',isLoggedIn, function(req,res){


    res.render('feed.ejs', {user: req.user});

//    var posts = mongoose.model('post', postSchema);

//    mongoose.model('Post').find({}, {}, function(e, posts) {
//        res.render('feed.hbs', {user: req.user , 'post' : posts });
//    });

});

//router.get('/', function(req, res){
//    res.render({
//        scripts: 'abc.js'
//      });
//});

//router.post('/',function(req,res){
//
//    var inputValue = req.body.vote;
//
//    var query = {'id' : req.post.id};
//
//    if(inputValue.equals("up")){
//        req.newpost.postVotes = req.post.postVotes + 1;
//        mongoose.model('Post').findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
//            if (err)
//                return res.send(500, { error: err });
//            res.render('feed.hbs', {user: req.user , 'post' : posts });
//            });
//    }
//    else{    //if(inputValue.equals("down")){
//        req.newpost.postVotes = req.post.postVotes - 1;
//        mongoose.model('Post').findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
//            if (err)
//                return res.send(500, { error: err });
//
//            res.render('index');
//            //res.render('feed.hbs', {user: req.user , 'post' : posts });
//            });
//    }
//
//});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}


