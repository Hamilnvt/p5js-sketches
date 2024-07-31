const express = require("express");
const app = express();

app.get('/', (res, req) => {
  res.render(`<h1>ciao caro</h1>`);
  //res.send(`<script src="index.js"></script>`);
});

app.listen(3000, () => {
  console.log("Milf calda a 200 metri da te, per maggiori info vai su http://localhost:3000");
});
