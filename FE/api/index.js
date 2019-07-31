const express = require("express");
const rp = require("request-promise");
const fs = require("fs");
const cors = require("cors");

const app = express();

const offline = false;

function cb(req, res, endpoint) {
  if (offline) {
    fs.readFile("./mocks/" + endpoint + ".json", "utf8", function(
      err,
      content
    ) {
      res.send(content);
    });
  } else {
    rp({
      uri: "https://challenge-api.aerolab.co/" + endpoint
    }).then(data => {
      res.send(data);
    });
  }
}

function processProducts(products, dollar) {
  const today = new Date();
  const oneMonthLess = today.setMonth(today.getMonth() - 1);
  const lastProducts = products.products.filter(
    product => new Date(product.updatedAt) > oneMonthLess
  );

  return {
    ...products,
    products: lastProducts.map(product => ({
      ...product,
      dollarPrice: product.price * dollar
    }))
  };
}

function handleProductsReqs(req, res) {
  if (offline) {
    fs.readFile("./mocks/products.json", "utf8", function(err, products) {
      fs.readFile("./mocks/dollar.json", "utf8", function(err, dollar) {
        res.send(
          processProducts(JSON.parse(products), JSON.parse(dollar).rate)
        );
      });
    });
  } else {
    rp.get({
      uri: "https://challenge-api.aerolab.co/products?page=" + req.query.page
    })
      .then(products => {
        rp.get({
          uri: "https://challenge-api.aerolab.co/dollar"
        }).then(dollar => {
          res.send(
            processProducts(JSON.parse(products), JSON.parse(dollar).rate)
          );
        });
      })
      .catch(e => {
        res.status(400).send("End of list");
      });
  }
}

app.use(cors());
app.get("/api/products", (req, res) => handleProductsReqs(req, res));
app.get("/api/categories", (req, res) => cb(req, res, "categories"));
app.get("/api/dollar", (req, res) => cb(req, res, "dollar"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
