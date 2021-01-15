const express = require('express')
const app = express()
const port = 5000
const pool = require('./db')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', async (req, res) => {
  try {
    const getData = await pool.query("select * from event");
    res.json(getData.rows);
  } catch (err) {
    console.log(err.message);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})