import express from 'express';

// React Components
import React from 'react';
import RDS from 'react-dom/server';
import Avataaars from 'avataaars';
import {Piece} from 'avataaars';

const app = express();

app.set('view engine', 'html')

app.get('/', (req, res) => {
  const appString = RDS.renderToString(<Avataaars {...req.query} />);

  res.writeHead(200, {
    'Content-Type': 'image/svg+xml',
  });
  res.end(appString);
});

app.get('/piece', (req, res) => {
  const appString = RDS.renderToString(<Piece pieceSize="200" {...req.query} />);

  res.writeHead(200, {
    'Content-Type': 'image/svg+xml',
  });
  res.end(appString);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

module.exports = app;
