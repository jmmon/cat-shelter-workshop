var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');


// const hbs = require('handlebars');
// var multer = require('multer');
// var upload = multer();

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var addBreedRouter = require('./routes/add-breed');
var addCatRouter = require('./routes/add-cat');
var editCatRouter = require('./routes/edit-cat');
var newHomeRouter = require('./routes/new-home');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials("./views/partials");


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/cats/add-breed', addBreedRouter);
app.use('/cats/add-cat', addCatRouter);
app.use('/cats/edit-cat', editCatRouter);
app.use('/cats/new-home', newHomeRouter);

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
