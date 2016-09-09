var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', isLoggedIn , function(req,res){
    res.render('newpost.ejs', { user: req.user });
});

router.post('/', function(req,res){

    var postTitle = req.body.postTitle;
    var postText = req.body.postText;
    var postedByID = req.user.id;
    var postedByName = req.user.local.username;
    var postVotes = 0;
    var postDate = getDate();

    mongoose.model('Post').create({
        "postTitle" : postTitle,
        "postText" : postText,
        "postedByID" : postedByID,
        "postedByName" : postedByName,
        "postVotes" : postVotes,
        "postDate" : postDate
    }, function (err) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("/feed");
        }
    });
});

function getDate(){
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

module.exports = router;