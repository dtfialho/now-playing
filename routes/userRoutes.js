const requireLogin = require('../middlewares/requireLogin');
const Twit = require('twit');
const keys = require('../config/keys');

module.exports = (app) => {
  app.get('/api/user_friends', requireLogin, (req, res) => {
    let { user } = req;
    const client = new Twit({
      consumer_key: keys.TWITTER_CONSUMER_KEY,
      consumer_secret: keys.TWITTER_CONSUMER_SECRET,
      access_token: user.token,
      access_token_secret: user.tokenSecret
    });

    // client.get('friends/ids', null, (err, data, response) => {
    //   res.send(data);
    // });

    res.send({
      ids: [119897261]
    })
  });
};
