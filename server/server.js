const express = require('express');
const app = express();
const PORT = 3001;
const { pool } = require("./queries");

app.get('/', async (request, response) => {
  const res = await pool.query("SELECT * FROM boards");
  response.send(res.rows);
})

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`)
})