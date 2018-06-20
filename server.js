"use strict";

// npm modules
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

// standard lib
const path = require("path");

// application requires
const config = require("./server/config");
const routes = require('./server/routes/index');

const app = express();

// Use morgan for logging
app.use(logger('dev'));
// Parse form data from POST bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api", routes);

// Public directory hosts static content
app.use(express.static(path.join(__dirname, 'dist/ng-sms-messages')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(JSON.stringify({
      message: err.message,
      error: err
    }));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(JSON.stringify({
    message: err.message,
    error: {}
  }));
});


const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log(`SMS Messages App listening on http://localhost:${port}`);
});
