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
    callbackURL: '/auth/twitter/callback',
    proxy: true
  },
  async (accessToken, tokenSecret, profile, done) => {
    const existingUser = await
      User.findOne({ 'profile.twitterID': profile.id })
      .select({
        token: false,
        tokenSecret: false
      });

    if (!!existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({
      profile: {
        twitterID: profile.id,
        username: profile.username,
        displayName: profile.displayName
      },
      token: accessToken,
      tokenSecret: tokenSecret
    }).save();

    user.set('tokenSecret', undefined, {strict: false} );

    done(null, user);
  }
));
