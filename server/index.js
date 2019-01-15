const express = require("express");
const fs = require("fs");
const data = require("./data/data");
const products = require("./data/products");

const app = express();

app.use(express.static("./src"));

app.get("/data", async (req, res) => res.send(data));
app.get("/categories", async (req, res) => fs.readFile(`${__dirname}/data/categories.json`, "utf8", (err, categories) => res.send(categories)));

app.get("/products", async (req, res) => res.send(products));
app.get("/users", async (req, res) => fs.readFile(`${__dirname}/data/users.json`, "utf8", (err, users) => res.send(users)));

app.listen(process.env.PORT || 3000);
