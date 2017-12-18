var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');

var app = express();

var PORT = process.env.PORT || 9400


// UNCOMMENT FOR ANGULAR
app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/', function(req, res){
  res.send('hello world')
})


app.listen(PORT, function() {
  console.log('listening on port 3000!');
});

