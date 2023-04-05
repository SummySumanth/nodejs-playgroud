const express = require('express');

const server = express();




server.use('/users', (req, res, next) => {

  console.log('in users');
  res.send('<h1>users</h1>');
});

server.use('/add-product', (req, res, next) => {
  res.send(`
    <form action="/product" method="POST">
      <input> type="text" name="title>
      <button type="submit">Add Product</button>
    </form>
  `);
});
          
server.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});


server.use('/route-b', (req, res, next) => {
  console.log('in route B');
  res.send('<h1>Route B</h1>');
});


server.use('/', (req, res, next) => {

  console.log('in home');
  res.send('<h1>home</h1>');
  next();
});

server.listen('3000')