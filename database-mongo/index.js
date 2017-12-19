const mongoose = require('mongoose');

mongoose.connect('mongodb://hledet:radiohead509@ds159866.mlab.com:59866/projectify');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const itemSchema = mongoose.Schema({
  quantity: Number,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  meta: {
    likes: [String],
  },
});

const User = mongoose.model('User', userSchema);

const selectAll = function (callback) {
  Item.find({}, (err, items) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.User = User;
module.exports.Item = Item;
