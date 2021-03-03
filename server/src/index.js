const express = require("express");
const _ = require("./util/config.js");
const initDB = require("./util/db.js");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
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

main();
