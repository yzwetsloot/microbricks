const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const _ = require("./util/config.js");
const db = require("./util/db.js");

const port = 9000;

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.static("../client/build"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/search", async (req, res, next) => {
  const queryParam = req.query.q;

  let result;
  try {
    result = await db.query(
      "SELECT * FROM product WHERE title ILIKE $1 ORDER BY last_modified DESC LIMIT $2",
      [`%${queryParam}%`, process.env.PRODUCT_LIMIT]
    );
  } catch (err) {
    return next(err);
  }

  const data = result.rows;

  res.json(data);
});

app.get("/product/:id", async (req, res, next) => {
  const id = req.params.id;

  // retrieve price history
  let result;

  try {
    result = await db.query(
      "SELECT * FROM price WHERE id = $1 ORDER BY last_modified",
      [id]
    );
  } catch (err) {
    return next(err);
  }

  const priceHistory = result.rows;

  // retrieve quantity history
  try {
    result = await db.query(
      "SELECT * FROM quantity WHERE id = $1 ORDER BY last_modified",
      [id]
    );
  } catch (err) {
    return next(err);
  }

  const quantityHistory = result.rows;

  const [priceTimestamps, priceValues] = transformHistory(priceHistory);
  const [quantityTimestamps, quantityValues] = transformHistory(
    quantityHistory
  );

  const responseBody = {
    price: {
      timestamps: priceTimestamps,
      values: priceValues,
    },
    quantity: {
      timestamps: quantityTimestamps,
      values: quantityValues,
    },
  };

  res.json(responseBody);
});

app.listen(port, () => {
  console.info(`App listening at http://localhost:${port}`);
});

function transformHistory(records) {
  if (!records.length) return [];

  let recordTimestamps = [records[0].first_retrieved];
  const partialTimestamps = records.flatMap((item) => {
    const lastModified = item.last_modified;
    lastModified.setSeconds(lastModified.getSeconds() + 1);
    return [item.last_modified, lastModified];
  });
  recordTimestamps = recordTimestamps.concat(partialTimestamps);
  recordTimestamps.pop();

  const recordValues = records.flatMap((item) => [item.value, item.value]);

  return [recordTimestamps, recordValues];
}
