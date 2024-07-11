const express = require('express');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile.js');
const Contract = require('./models/Contract');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo para evitar conflitos
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('contract'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    res.send(`Arquivo ${req.file.originalname} foi enviado com sucesso.`);
});

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
