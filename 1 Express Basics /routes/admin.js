const express = require('express');

const router = express.Router();

router.post('/add-product', (req, res, next) => {
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title" />
      <button type="submit" > Add Product</button>
    </form>
  `);
});

router.get('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = Router;