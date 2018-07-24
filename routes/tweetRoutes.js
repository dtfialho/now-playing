const requireLogin = require('../middlewares/requireLogin');
const Twitter = require('twitter-node-client').Twitter;
const keys = require('../config/keys');

const tweetsRoute = 'https://api.twitter.com/1.1/search/tweets.json';

module.exports = app => {
  app.get('/api/tweets', requireLogin, (req, res) => {
    const client = new Twitter({
      consumerKey: keys.TWITTER_CONSUMER_KEY,
      consumerSecret: keys.TWITTER_CONSUMER_SECRET,
      accessToken: req.user.token,
      accessTokenSecret: req.user.tokenSecret
    });

    client.getSearch({'q': 'youtube #nowPlaying', 'geocode': '-22.5031833,-43.169863199999995,10km', count: 5}, (err, response, body) => {
      res.status(400).send({error: 'erro'});
    }, (data) => {
      res.send(data);
    });
  });
};
