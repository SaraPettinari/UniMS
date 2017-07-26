var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/dbUnims');
 
var Schema = mongoose.Schema;
 
var user = new Schema({
  title: String,
  text: String,
  place: String,
  position: {
    latitude: Number,
    longitude: Number
  },
  created: Date,
  updated: Date
});
 
var User = mongoose.model('Users', user);

module.exports = User;