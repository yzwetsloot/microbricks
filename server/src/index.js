const path = require("path");
const express = require("express");
const morgan = require("morgan");

const _ = require("./util/config.js");
const db = require("./util/db.js");

const app = express();

if (process.env.NODE_ENV === "dev") app.use(morgan("combined"));

if (process.env.NODE_ENV === "prod") {
  app.use(express.static(path.join(__dirname, "../..", "client", "build")));

  app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
  );
}

app.get("/search", async (req, res, next) => {
  const queryParam = req.query.q;

  let result;
  try {
    result = await db.query(
      "SELECT * FROM product WHERE title ILIKE $1 OR id LIKE $1 OR ean LIKE $1 OR category ILIKE $1 ORDER BY last_modified DESC LIMIT $2",
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.info(
    `Server running in '${process.env.NODE_ENV}' mode listening on port ${PORT}`
  )
);

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
