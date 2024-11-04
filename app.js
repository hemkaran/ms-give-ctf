'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", "./views");
app.set('view engine', 'ejs'); // You need to have the EJS templating engine installed
app.use(express.static('public'));

app.get('/ping', (req, res) => {
  res.json({ data: 'pong' });
});

app.get('/', (req, res) => {
  res.render('index');
});

// Treasure hunt home page
app.get('/coding-marvels', (req, res) => {
  res.render('treasureHunt');
});

const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

