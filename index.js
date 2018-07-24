const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

require('./models/User');
require('./services/passport');

const keys = require('./config/keys');

mongoose.connect(keys.MONGO_URI, {
  user: keys.MONGO_USERNAME,
  pass: keys.MONGO_PASSWORD
});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [ keys.COOKIE_KEY ]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
