var express = require('express');
var app = express();
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/web-app-maker');

// npm install mongojs --save
// require mongojs
var mongojs = require('mongojs');

// connect to database
var db = mongojs('web-app-maker');

// set ejs as the view engine
app.set('view engine', 'ejs');

// load passport module
var passport = require('passport');

// load cookie parsers
var cookieParser = require('cookie-parser');

// load session support
var session      = require('express-session');

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure cookie parser - needed for oauth
app.use(cookieParser());

// configure session support
app.use(session({ secret: 'meanstackisthebest' }));

// initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// pass mongojs connection to our server side app
require ("./app/app.js")(app, db);

app.listen(3000);