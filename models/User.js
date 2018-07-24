const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  profile: {
    twitterID: String,
    username: String,
    displayName: String
  },
  token: String,
  tokenSecret: String
});

mongoose.model('users', userSchema);
