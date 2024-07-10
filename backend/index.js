const express = require('express');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile.js');
const Contract = require('./models/Contract');
require('dotenv').config();

const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express();
app.use(bodyParser.json());

app.get('/contracts', async (req, res) => {
  const contracts = await Contract.query();
  res.json(contracts);
});

app.get('/contracts/:id', async (req, res) => {
  const contract = await Contract.query().findById(req.params.id);
  res.json(contract);
});

app.post('/contracts', async (req, res) => {
  const contract = await Contract.query().insert(req.body);
  res.status(201).json(contract);
});

app.put('/contracts/:id', async (req, res) => {
  const contract = await Contract.query().patchAndFetchById(req.params.id, req.body);
  res.json(contract);
});

app.delete('/contracts/:id', async (req, res) => {
  await Contract.query().deleteById(req.params.id);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
