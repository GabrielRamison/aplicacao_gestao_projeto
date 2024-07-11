// backend/server.js
import express from "express";

const app = new express();

app.get('/', (req, res) => {
  res.send('Node Express com MySQL');
})

app.listen('3000', () => {
  console.log('Running server');
})