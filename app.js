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
app.use(cors());

app.use(expressJWT({ secret: process.env.TOKEN_SECRET }).unless({ path:['/auth/signin','/auth/signup'] }))

app.use('/auth', auth);
app.use('/users', users);
// app.use('/goals', goals);
// app.use('/exercises', exercises);
// app.use('/sessions', sessions);

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
