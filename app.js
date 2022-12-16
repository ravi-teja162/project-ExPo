require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const crypto = require('crypto')

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


// routes 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const teamsRouter = require('./routes/teams');
const reviewsRouter = require('./routes/reviews');

const app = express();

// mongoose connect offline

const uri = "mongodb://127.0.0.1:27017/project-expo"
const conn = mongoose.connect(uri, {
  useNewUrlParser: true
})
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err))



// mongo connect atlas cloud

// const uri = "mongodb+srv://teja:teja2003@cluster0.fbcbkou.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(uri, {
//   useNewUrlParser: true
// })
// .then(() => {
//   console.log("MongoDB Connected…")
// })
// .catch(err => console.log(err))



app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use(session({
  secret: 'Heyyyy',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
// User.plugin(passportLocalMongoose);
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.title = 'Project-ExPo';
  res.locals.success = req.session.success || '';
  delete req.session.success;
  res.locals.error = req.session.error || '';
  delete req.session.error;
  next();
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);
app.use('/teams', teamsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
