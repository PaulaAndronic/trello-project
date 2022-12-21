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

app.put('/', async (request, response) => {
  const { boardId, title } = request.body;
  const res = await pool.query('UPDATE boards SET title = $1 WHERE boardid = $2', [title, boardId]);
  response.send("Done");
})

app.get('/board/:boardId', async (request, response) => {
  const res = await pool.query(`SELECT * FROM lists WHERE boardid=$1`, [request.params.boardId]);
  response.send(res.rows);
})

app.post('/board/:boardId', async (request, response) => {
  const { title } = request.body;
  const res = await pool.query('INSERT INTO lists(title, boardId) VALUES($1, $2)', [title, request.params.boardId]);
  response.send("Done");
})

app.delete('/board/:boardId', async (request, response) => {
  const { listId } = request.body;
  const res = await pool.query('DELETE FROM lists WHERE listid=$1', [listId]);
  response.send("Done");
})

app.put('/board/:boardId', async (request, response) => {
  const { listId, title } = request.body;
  const res = await pool.query('UPDATE lists SET title = $1 WHERE listid = $2', [title, listId]);
  response.send("Done");
})

app.get('/board/:boardId/cards-list', async (request, response) => {
  const res = await pool.query(`SELECT * FROM cards`);
  response.send(res.rows);
})

app.post('/board/:boardId/cards-list', async (request, response) => {
  const { title, fklist } = request.body;
  const res = await pool.query('INSERT INTO cards(cardtitle, fklist) VALUES($1, $2)', [title, fklist]);
  response.send("Done");
})

app.put('/board/:boardId/cards-list', async (request, response) => {
  const { cardId, title, description } = request.body;
  const res = await pool.query('UPDATE cards SET cardTitle = $1, description = $2 WHERE cardid = $3', [title, description, cardId]);
  response.send("Done");
})

app.delete('/board/:boardId/cards-list', async (request, response) => {
  const { cardId } = request.body;
  const res = await pool.query('DELETE FROM cards WHERE cardid=$1', [cardId]);
  response.send("Done");
})

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`)
})