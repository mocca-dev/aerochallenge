const express = require("express");
const request = require("request");
const fs = require("fs");
const cors = require("cors");

const app = express();

const offline = true;

function cb(req, res, endpoint) {
  if (offline) {
    fs.readFile("./mocks/" + endpoint + ".json", "utf8", function(
      err,
      content
    ) {
      res.send(content);
    });
  } else {
    const newEndpoint = req.query.page ? endpoint + req.query.page : endpoint;

    request({
      uri: "https://challenge-api.aerolab.co/" + newEndpoint
    }).pipe(res);
  }
}

app.use(cors());
app.get("/products", (req, res) => cb(req, res, "products?page="));
app.get("/categories", (req, res) => cb(req, res, "categories"));
app.get("/dollar", (req, res) => cb(req, res, "dollar"));

app.listen(3001, console.log("LISTENING ON 3001"));
