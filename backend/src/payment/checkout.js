const express = require('express');
const router = express.Router();

// const pool = require('./db')
// const { port } = require('./secrets.js')
// const checkout = require('./payment/checkout')

// app.use(express.json());

// app.get('/api/test', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/api/stripe', (req, res) => res.json(checkout));

// app.get('/api/events', async (req, res) => {
//   try {
//     const getData = await pool.query("select * from event");
//     res.json(getData.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// })


router.get('/api/checkout', async (req, res) => {
    try {
      const getData = await pool.query("select * from event where id = 1");
      res.json(getData.rows);
      module.exports = res.json(getData.rows);
    } catch (err) {
      console.log(err.message);
    }
  })

