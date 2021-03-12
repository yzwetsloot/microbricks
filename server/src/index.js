const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const _ = require("./util/config.js");
const initDB = require("./util/db.js");
const data = require("./util/data.js");
const history = require("./util/history.js");

const port = 9000;

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.static("../client/build"))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/search", (req, res) => {
  const query = req.query.q;
  console.info(`Received search query parameter '${query}'`);

  setTimeout(() => res.json(data), 2000);
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  console.info(`Received ID parameter '${id}'`);

  const quantities = history.quantity;
  const quantityValues = quantities.flatMap(item => [item.value, item.value]);
  let quantityTimestamps = [quantities[0].first_retrieved];
  const quantityTimestampsRest = quantities.flatMap(item => {
    const lastModified = new Date(item.last_modified);
    lastModified.setSeconds(lastModified.getSeconds() + 1);
    return [item.last_modified, lastModified.toJSON()];
  });
  quantityTimestamps = quantityTimestamps.concat(quantityTimestampsRest);
  quantityTimestamps.pop();

  const prices = history.price;
  const priceValues = prices.flatMap(item => [item.value, item.value]);
  let priceTimestamps = [prices[0].first_retrieved];
  const priceTimestampsRest = prices.flatMap(item => {
    const lastModified = new Date(item.last_modified);
    lastModified.setSeconds(lastModified.getSeconds() + 1);
    return [item.last_modified, lastModified.toJSON()];
  });
  priceTimestamps = priceTimestamps.concat(priceTimestampsRest);
  priceTimestamps.pop();

  const responseBody = {
    price: {
      timestamps: priceTimestamps,
      values: priceValues,
    },
    quantity: {
      timestamps: quantityTimestamps,
      values: quantityValues,
    }
  }

  res.json(responseBody);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function main() {
  console.info("Start application");
  const client = await initDB();

  const id = "1001004001685534";

  client
    .query("SELECT * FROM product WHERE id = $1", [id])
    .then((res) => {
      console.info(res.rows[0]);
    })
    .catch((e) => console.error(e.stack));

  client
    .query("SELECT * FROM product LIMIT 5")
    .then((res) => {
      console.info(res.rows);
      client.end();
    })
    .catch((e) => console.error(e.stack));
}
