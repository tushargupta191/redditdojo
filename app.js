var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var newpost = require('./routes/newpost');
var feed = require('./routes/feed');

var port = process.env.PORT || 3000;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

var db = require('./models/db');

require("./models/post");
require("./models/user");
require("./models/comment");


var app = express();


//
var hbs = require('hbs');
var fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(function(req,res,next){
    req.db = db;
    next();
});


//


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'shhsecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);
app.use('/newpost', newpost);
app.use('/feed', feed);

require('./config/passport')(passport);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = configDB;
    next();
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


app.use(express.static(__dirname + '/public'));

app.listen(port);
module.exports = app;