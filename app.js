const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
// const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

dotenv.config();

app.use(
  session({
    secret: process.env.secretOrKey,
    reSave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

// For later research
app.use(passport.initialize());
app.use(passport.session());

app.enable('trust proxy');
app.use(
  cors({
    credentials: true,
  }),
);

// For socket if use
const http = require('http');

const server = http.createServer(app);

// Swagger configuration
// eslint-disable-next-line node/no-unpublished-require
const swaggerFile = require('./swagger_output.json');

app.use('/apis-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));
// Mongo configuration
mongoose
  .connect(process.env.URI || 'localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    // Test hook before test case if possible
    app.emit('app_started');
  })
  .catch(() => {});
mongoose.connection.on('connected', () => {
  // Test hook before test case if possible
  // console.log('Connected to mongodb clound!');
  app.emit('app_started');
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app,
  server,
};
