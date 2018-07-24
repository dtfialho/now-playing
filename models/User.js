const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  twitterID: String,
  username: String,
  displayName: String
});

mongoose.model('users', userSchema);
