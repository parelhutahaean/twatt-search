const express = require('express');
const router = express.Router();
require('dotenv').config();

var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.CONSUMER_KEY,
  process.env.CONSUMER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

router.get('/', (req, res) => {
  res.send('Alive from router');
})

router.get('/search', (req, res) => {
  oauth.get(
  'https://api.twitter.com/1.1/search/tweets.json?q=bandung',
  process.env.ACCESS_TOKEN,
  process.env.ACCESS_SECRET,
  function (e, data){
    var statuses = JSON.parse(data).statuses;
    var dataView = [];
    statuses.forEach(status => {
      var object = {};
      object.text = status.text;
      object.user = status.user.name;
      dataView.push(object);
    })
    res.send(dataView);
  });
})

module.exports = router;
