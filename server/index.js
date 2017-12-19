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

app.get('/items', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

// flesh out query for user to determine if you can access their collections
// app.get('/users', (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
// });

// flesh out for adding new user, just not passing through password the right way.
app.post('/users', jsonParser, (req, res) => {
  console.log(req);
  console.log(req.body, 'this is req.body in post/users');
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({ username, password });
  res.status(201).send(user);
});

// adding liked pictures
// app.post('/addLikes', jsonParser, (req, res) => {

// });
// deleting liked pictures
// app.delete('/addLikes', (req, res) {

// });


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

