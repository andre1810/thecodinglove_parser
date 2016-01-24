'use strict';

const http = require('follow-redirects').http;
const assert = require('assert');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const getHeadlineFromBody = function(body) {
  const titleMatches = body.match(/<h3>(.*?)<\/h3>/);
  let title = titleMatches[1];
  title = entities.encode(title);

  return title;
};

const getImageUrlFromBody = function(body) {
  const imageMatches = body.match(/<p class="(.*?)"><img src="(.*?)">/);
  const image = imageMatches[2];

  return image;
};

const getRandomEntry = function(cb) {
  http.get('http://thecodinglove.com/random', function (res) {

    let body = '';
    let title = '';
    let image = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      const entry = {
        title: getHeadlineFromBody(body),
        image: getImageUrlFromBody(body),
      };

      cb(null, entry);
    });
  }).on('error', function(err) {
    cb(err, null);
  });
};

module.exports.getRandomEntry = getRandomEntry;
