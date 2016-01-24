'use strict';

const parser = require('./parser.js');

parser.getRandomEntry(function(error, entry) {

  if (!!error) {
    console.error(error);
  } else {
    console.log(entry);
  }
});
