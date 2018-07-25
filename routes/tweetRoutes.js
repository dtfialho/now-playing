const requireLogin = require('../middlewares/requireLogin');
const Twit = require('twit');
const keys = require('../config/keys');

const tweetsRoute = 'https://api.twitter.com/1.1/search/tweets.json';

module.exports = app => {
  app.get('/api/tweets', requireLogin, (req, res) => {
    const client = new Twit({
      consumer_key: keys.TWITTER_CONSUMER_KEY,
      consumer_secret: keys.TWITTER_CONSUMER_SECRET,
      access_token: req.user.token,
      access_token_secret: req.user.tokenSecret
    });

    try {
      client.get('search/tweets', {'q': 'youtube #nowPlaying', 'geocode': '-22.5031833,-43.169863199999995,10km', count: 5}, (err, data, response) => {
        res.send(data);
      });
    } catch(e) {
      res.status(400).send({error: 'error'});
    }
  });
};
