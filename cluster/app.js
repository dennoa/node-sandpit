'use strict';

const express = require('express');

const app = express();

// Handling a static file request triggers termination of the process
app.use(express.static(__dirname, {
  setHeaders: (() => {
    setTimeout(() => process.exit(0), 2000);
  })
}));

app.get('/hi/:i', (req, res) => {
  setTimeout(() => {
    res.status(200).send(`Hi to request ${req.params.i} from worker ${process.pid}\n`);
  }, 500);
});

module.exports = app;
