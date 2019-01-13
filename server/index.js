const express = require("express");
const data = require("./data/data");
const products = require("./data/products");
const users = require("./data/users");

const app = express();

app.use(express.static("./src"));

app.get("/data", async (req, res) => res.send(data));
app.get("/products", async (req, res) => res.send(products));
app.get("/users", async (req, res) => res.send(users));
app.listen(process.env.PORT);
