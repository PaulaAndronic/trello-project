const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3001;
const { pool } = require("./queries");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async (request, response) => {
  const res = await pool.query("SELECT * FROM boards");
  response.send(res.rows);
})

app.post('/', async (request, response) => {
  const { title, color } = request.body;
  const res = await pool.query('INSERT INTO boards(title, color) VALUES($1, $2)', [title, color]);
  response.send("Done");
})

app.delete('/', async (request, response) => {
  const { boardId } = request.body;
  const res = await pool.query('DELETE FROM boards WHERE boardid=$1', [boardId]);
  response.send("Done");
})

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`)
})