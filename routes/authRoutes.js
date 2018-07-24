const passport = require('passport');

module.exports = app => {
  app.get('/auth/twitter',
    passport.authenticate('twitter')
  );

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      res.send(req.user);
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
