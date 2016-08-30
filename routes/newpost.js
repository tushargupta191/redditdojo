var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

router.get('/', function(req,res){
    res.render('newpost.ejs', { user: req.user });
});

router.post('/', function(req,res){

    // Get our form values. These rely on the "name" attributes
    var postTitle = req.body.postTitle;
    var postText = req.body.postText;
    var postedBy = req.user.id;//<%= user.local.username %> ;
    var postVotes = 0;
    var postDate = getdate();

    mongoose.model('Post').create({
        "postTitle" : postTitle,
        "postText" : postText,
        "postedBy" : postedBy,
        "postVotes" : postVotes,
        "postDate" : postDate
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/feed");
        }
    });
});

function getdate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    return mm.toString() +'/'+dd.toString()+'/'+yyyy.toString();
}

module.exports = router;