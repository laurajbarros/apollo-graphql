const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id: String,
  name: String,
  lastName: String,
  profile: {type: Array, default:[]},
  jobapplication: {type: Array, default:[]}
});

const User = mongoose.model('user', userSchema);

module.exports = {
  User
};
