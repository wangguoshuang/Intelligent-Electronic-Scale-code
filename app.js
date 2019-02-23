var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyparser = require ('bodyparser');
//创建WEB应用
var app = express();
//解析urlencode 编码格式请求体
app.use (bodyparser.urlencoded ({extended:false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 根路径请求
app.get ('/',function (req,res) {res.sendfile (__dirname + './public/home.html')});
app.post ('/login',function (req,res) {if('admin' == req.body.account && '123' == req.body.password)
    { res.send ('login success!');}else {res.send ('failed,bad accant or password!')};
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
