let mongoose = require('mongoose');

mongoose.connect('mongodb://hledet:radiohead509@ds159866.mlab.com:59866/projectify');

let db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

let itemSchema = mongoose.Schema({
  quantity: Number,
  description: String,
});

let Item = mongoose.model('Item', itemSchema);

let userSchema = mongoose.Schema({
  name: { type: String, unique: true },
  password: String,
  meta: {
    likes: [String],
  },
});

let User = mongoose.model('User', userSchema)

let selectAll = function (callback) {
  Item.find({}, (err, items) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
