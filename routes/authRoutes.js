const passport = require('passport');

module.exports = app => {
  app.get('/auth/twitter',
    passport.authenticate('twitter')
  );

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/tweets');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    let { user } = req;
    if (!!user) {
      user.token = undefined;
      user.tokenSecret = undefined;
    }

    res.send(user);
  });
};
