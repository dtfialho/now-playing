const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new TwitterStrategy(
  {
    consumerKey: keys.TWITTER_CONSUMER_KEY,
    consumerSecret: keys.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ twitterID: profile.id });

    if (!!existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({
      twitterID: profile.id,
      username: profile.username,
      displayName: profile.displayName
    }).save();
    done(null, user);
  }
));
