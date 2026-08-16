const express = require('express');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');

const app = express();

const offline = false;

function cb(req, res, endpoint) {
  if (offline) {
    fs.readFile(
      './mocks/' + endpoint + '.json',
      'utf8',
      function (err, content) {
        res.send(content);
      },
    );
  } else {
    axios
      .get('https://challenge-api.aerolab.co/' + endpoint)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.status(500).send('Error fetching data');
      });
  }
}

function processProducts(products, dollar) {
  const today = new Date();
  const oneMonthLess = today.setMonth(today.getMonth() - 1);
  const lastProducts = products.products.filter(
    (product) => new Date(product.updatedAt) > oneMonthLess,
  );

  return {
    ...products,
    products: lastProducts.map((product) => ({
      ...product,
      dollarPrice: product.price * dollar,
    })),
  };
}

function handleProductsReqs(req, res) {
  if (offline) {
    fs.readFile('./mocks/products.json', 'utf8', function (err, products) {
      fs.readFile('./mocks/dollar.json', 'utf8', function (err, dollar) {
        res.send(
          processProducts(JSON.parse(products), JSON.parse(dollar).rate),
        );
      });
    });
  } else {
    axios
      .get('https://challenge-api.aerolab.co/products?page=' + req.query.page)
      .then((productsResponse) => {
        axios
          .get('https://challenge-api.aerolab.co/dollar')
          .then((dollarResponse) => {
            res.send(
              processProducts(productsResponse.data, dollarResponse.data.rate),
            );
          });
      })
      .catch((e) => {
        res.status(400).send('End of list');
      });
  }
}

app.use(cors());
app.get('/api/products', (req, res) => handleProductsReqs(req, res));
app.get('/api/categories', (req, res) => cb(req, res, 'categories'));
app.get('/api/dollar', (req, res) => cb(req, res, 'dollar'));

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}`));
