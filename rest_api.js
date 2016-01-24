'use strict';

const express = require('express');
const app = express();
const parser = require('./parser.js');

app.get('/random', function(req, res) {

  parser.getRandomEntry(function(error, entry) {

    if (!!error) {
      console.error(error);
    } else {
      res.send(entry);
    }
  });
});

const port = process.env.port || 3000;

app.listen(port, function () {
  console.log('thecodinglove API Wrapper listening on port 3000!');
});
