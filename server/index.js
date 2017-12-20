const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mongo');
const axios = require('axios');

const User = items.User;
const Link = items.Link;

const app = express();

const PORT = process.env.PORT || 9400;

const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });


// UNCOMMENT FOR ANGULAR
app.use(express.static(`${__dirname}/../angular-client`));
app.use(express.static(`${__dirname}/../node_modules`));

// fetching liked pictures from username
app.get('/items', jsonParser, (req, res) => {
  console.log(req.body, 'this is req.body in /items ')
  const username = req.body.username;
  console.log('app.get /items being hit')
  User.findOne({ 'username' : 'hunter' }, 'likes', (err, data) => {
    console.log('this is data in get /items', data)
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// checks if user exists in database
app.post('/userCheck', jsonParser, (req, res) => {
  console.log('this is being fired in app.get("/usercheck")')
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body, 'req.body in /userCheck')
  User.findOne({ username: username, password: password }, (err, person) => {
    if (err) {
      console.log(err);
    } else {
      res.send(person);
    }
  });
});

// creates new user in database
app.post('/users', jsonParser, (req, res) => {
  console.log(req);
  console.log(req.body, 'this is req.body in post/users');
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({ username, password });
  user.save();
  res.status(201).send(user);
});

// adding liked pictures
app.post('/addLikes', jsonParser, (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const photo = req.body.photo;
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      user.likes.push(photo);
      user.save((err, updatedUser) => {
        if (err) {
          res.status(404);
        } else {
          res.send(user.likes);
        }
      })
    }
  })
});

// deleting liked pictures
app.post('/deleteLikes', jsonParser, (req, res) => {
  console.log(req.body, 'this is req.body in /deleteLikes');
  const username = req.body.username;
  const photo = req.body.photo;
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      for (let i = 0; i < user.likes.length; i++) {
        if (user.likes[i] === photo) {
          user.likes.splice(i, 1);
          user.save();
          res.send(user.likes);
        }
      }
    }
  })
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

