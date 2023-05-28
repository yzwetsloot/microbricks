const path = require("path");
const express = require("express");
const morgan = require("morgan");

const _ = require("./util/config.js");
const db = require("./util/db.js");

const app = express();

const buildPath = path.join(__dirname, "../..", "client", "build");

if (process.env.NODE_ENV === "dev") app.use(morgan("combined"));

if (process.env.NODE_ENV === "prod") app.use(express.static(buildPath));

app.get("/p/search", async (req, res, next) => {
  const queryParam = req.query.q;

  let result;
  try {
    result = await db.query(
      "SELECT * FROM product WHERE title ILIKE $1 OR id LIKE $1 OR ean LIKE $1 OR category ILIKE $1 ORDER BY modified_at DESC LIMIT $2",
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
      "SELECT * FROM price WHERE id = $1 ORDER BY modified_at",
      [id]
    );
  } catch (err) {
    return next(err);
  }

  const priceHistory = result.rows;

  // retrieve quantity history
  try {
    result = await db.query(
      "SELECT * FROM quantity WHERE id = $1 ORDER BY modified_at",
      [id]
    );
  } catch (err) {
    return next(err);
  }

  const quantityHistory = result.rows;

  const [priceTimestamps, priceValues] = transformHistory(priceHistory);
  const [quantityTimestamps, quantityValues] =
    transformHistory(quantityHistory);

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

if (process.env.NODE_ENV === "prod")
  app.get("/*", (req, res) => res.sendFile(buildPath + "/index.html"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.info(
    `Server running in '${process.env.NODE_ENV}' mode listening on port ${PORT}`
  )
);

function transformHistory(records) {
  if (!records.length) return [];

  const timestamps = [];
  const values = [];

  const length = records.length;

  const lastRecord = records[length - 1];
  records.push({
    created_at: addSeconds(lastRecord.modified_at, 2),
  });

  for (let i = 0; i < length; i++) {
    const value = records[i].value;

    records[i + 1].created_at;
    timestamps.push(
      ...[records[i].created_at, addSeconds(records[i + 1].created_at, -1)]
    );

    values.push(...[value, value]);
  }

  return [timestamps, values];
}

function addSeconds(date, seconds) {
  return new Date(date.getTime() + seconds * 1000);
}
