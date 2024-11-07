'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

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
  res.render('challenge2/challenge2Index');
})


app.get('/challenge2/page/1', (req,res)=>{
  res.render('challenge2/page1');
})

app.get('/challenge2/page/1/edit', (req,res)=>{
  res.render('challenge2/editPage1');
})

app.get('/challenge2/page/2', (req,res)=>{
  res.render('challenge2/page2');
})

app.get('/challenge2/page/2/edit', (req,res)=>{
  res.render('challenge2/editPage2');
})



app.get('/challenge2/page/3',(req,res) => {
  res.status(403);
  res.render('challenge2/privatePageForbidden');
})

app.get('/challenge2/page/3/edit',(req,res) => {
  res.render('challenge2/privatePage');
})

// app.get('/challenge2/queries',(req,res)=> {
//   res.render('queriesPage');
// })

// app.post('/challenge2/queries/confirmation',(req,res)=> {
//   res.status(403);
//   res.render('queriesConfirmationPage');
// })

// app.get('/challenge2/contribute',(req,res)=> {
//   res.render('contributePage');
// })

// app.post('/challenge2/contribute/confirmation',(req,res)=> {
//   res.render('contributeConfirmationPage');
// })

//challenge 3
const items = {
  kitten: { id: 0, name: "Kitten", desc: "8\"x10\" color glossy photograph of a kitten.", logo: "kitten.jpg", price: 8.95 },
  puppy: { id: 1, name: "Puppy", desc: "8\"x10\" color glossy photograph of a puppy.", logo: "puppy.jpg", price: 7.95 },
};

app.get('/challenge3', (req,res)=>{
  res.render('challenge3Index');
})

app.post('/challenge3/checkout', (req,res)=>{
  const {kittenCount, puppyCount} = req.body;
  const value = [];
   if (kittenCount && parseInt(kittenCount, 10) > 0) {
    for (let i = 0; i < parseInt(kittenCount, 10); i++) {
      value.push([items.kitten.id, items.kitten]);
    }
  }
  if (puppyCount && parseInt(puppyCount, 10) > 0) {
    for (let i = 0; i < parseInt(puppyCount, 10); i++) {
      value.push([items.puppy.id, items.puppy]);
    }
  }

  res.render('checkout', {value});
})

app.post('/challenge3/buynow', (req,res)=>{
  try{
    const cart = req.body.cart;
    const items = JSON.parse(cart);
    const totalPrice = items.reduce((sum, item) => {
      return sum + (item[1].price || 0);
    }, 0);
    const encodedFlag = "01011010 01101101 01111000 01101000 01011010 00110011 01110011 01111000 01100100 01000100 01010110 01100110 01001110 01000111 01111000 01110011 01011000 01111010 01000110 01110101 01011000 00110011 01010010 01101111 01001101 00110001 00111001 01101010 01001110 01001000 01001010 00110000 01100110 01010001 00111101 00111101";
    if(totalPrice == 0 && items.length > 0){
      res.render('challenge3Flag', {flag: encodedFlag});
    }
    else {
    res.render('paymentStatus', {value: items, totalPrice});
    }
  } catch(error) {
    res.render('paymentStatus', {value: [], totalPrice: 0});
  }
});

app.get('/challenge3/buynow', (req,res)=>{
  res.redirect('/challenge3');
});
app.get('/challenge4',(req,res)=> {
  res.render('vignereScript');
})

// Route to handle Python file download
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'well_done.png'); 
  res.download(filePath, 'well_done.png', (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send('Error downloading the file.');
    }
  });
});

// Challenge 2 - Anjali, Edit access problem with Private page, "cipher the flag" - Yashank
// Challenge 3 - Rani, first part of "Add to Cart" system "Find second part"
// Challenge 4 - Yashank, Script.py with Vignere Cypher

const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

