var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var dotenv = require('dotenv').config();
var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken')

var index = require('./routes/index');
var users = require('./routes/users');
var goals = require('./api/v1/goals');
var exercises = require('./api/v1/exercises');
var sessions = require('./api/v1/sessions')
var auth = require('./api/v1/auth')
var users = require('./api/v1/users')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(
  // {
  // origin: "*",
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // preflightContinue: true,
  // credentials: true,
  // allowedHeaders: ["X-ACCESS_TOKEN", "Access-Control-Allow-Origin", "Authorization", "Origin", "x-requested-with", "Content-Type", "Content-Range", "Content-Disposition", "Content-Description"],
  // exposedHeaders: ['Content-Range', 'X-Content-Range',"Authorization"],
  // optionsSuccessStatus: 204
// }
));

app.use(expressJWT({ secret: process.env.TOKEN_SECRET }).unless({ path:['/auth/signin','/auth/signup'] }))

app.use('/auth', auth);
app.use('/users', users);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
