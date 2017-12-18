var mongoose = require('mongoose');
mongoose.connect(`mongodb://hledet:radiohead509@ds159866.mlab.com:59866/projectify`);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  quantity: Number,
  description: String
});

var Item = mongoose.model('Item', itemSchema);

var userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  password: String,
  meta: {
    likes: [String]
  }
})

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;