const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/api/tweets', requireLogin, (req, res) => {
    // const surveys = await Survey.find({ _user: req.user.id })
    //   .select({
    //     recipients: false
    //   });

    res.send({});
  });
};
