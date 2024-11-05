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

// Challenge 1
app.get('/get-you-started', (req, res) => {
  res.render('getYouStarted');
});

app.get('/background.png', (req, res) => {
  res.render('backgroundFlag');
});

app.get('/forbidden', (req,res) => {
  res.status(403);
  res.render('index');
})

// Challenge 2 -Edit access problem with Private Page
app.get('/challenge2', (req,res)=>{
  res.render('challenge2Index');
})

app.get('/challenge2/edit-article',(req,res) => {
  res.status(403);
  res.render('privatePageForbidden');
})

app.get('/challenge2/edit-article/confirmation',(req,res) => {
  res.render('privatePage');
})

app.get('/challenge2/queries',(req,res)=> {
  res.render('queriesPage');
})

app.post('/challenge2/queries/confirmation',(req,res)=> {
  res.status(403);
  res.render('queriesConfirmationPage');
})

app.get('/challenge2/contribute',(req,res)=> {
  res.render('contributePage');
})

app.post('/challenge2/contribute/confirmation',(req,res)=> {
  res.render('contributeConfirmationPage');
})

// Challenge 2 - Anjali, Edit access problem with Private page, "cipher the flag" - Yashank
// Challenge 3 - Rani, first part of "Add to Cart" system "Find second part"
// Challenge 4 - Yashank, Script.py with Vignere Cypher

const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

