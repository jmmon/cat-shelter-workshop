var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const exphbs = require('express-handlebars');
const hbs = require('handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addBreedRouter = require('./routes/add-breed');
var addCatRouter = require('./routes/add-cat');
var editCatRouter = require('./routes/edit-cat');

var app = express();

// view engine setup
// app.engine('hbs', exphbs({
//     defaultLayout: 'main',
//     extname: '.hbs',
//     helpers: {
//         if_eq(a, b, opts) {
//             if (comment.length < 64) {
//                 return comment;
//             }
//             return comment.substring(0, 61) + '...';
//         }
//     }
// }));
app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs());
app.set('view engine', 'hbs');

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

// app.engine('handlebars', hbs);//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cats/add-breed', addBreedRouter);
app.use('/cats/add-cat', addCatRouter);
app.use('/cats/edit-cat', editCatRouter);




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
