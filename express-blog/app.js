var createError = require('http-errors');//http 的 error
var express = require('express');
var path = require('path'); //path 路径文件
var cookieParser = require('cookie-parser'); //解析cookie 省去操作
var logger = require('morgan');//记录日志

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');//父路由 后面在users中添加
var userRouter = require('./routes/user')
var blogRouter =require('./routes/blog')

var app = express();//设置实例 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());//获取express 的body 的post请求 拿到postData 获取json格式
app.use(express.urlencoded({ extended: false })); //post数据兼容其他的格式 （除了json）
app.use(cookieParser());//解析cookie
//app.use(express.static(path.join(__dirname, 'public')));//拿到css等静态文件
//注册路由
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api/user',userRouter)
app.use('/api/blog',blogRouter)
// catch 404 and forward to error handler 不在路由范围内报错
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
