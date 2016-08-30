var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req,res){

//    var posts = mongoose.model('post', postSchema);

    mongoose.model('Post').find({}, {}, function(e, posts) {
                         res.render('feed.hbs', {user: req.user , 'post' : posts });
    });

});

module.exports = router;


