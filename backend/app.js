// app.js

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const knex = require('./backend/db'); // Assumindo que você tem um arquivo db.js para configuração do Knex
const Contract = require('./backend/models/Contract');
const pdfParse = require('pdf-parse');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(fileUpload());

// Upload de Contratos
app.post('/upload', async (req, res) => {
  if (!req.files || !req.files.contract) {
    return res.status(400).send('No file uploaded.');
  }

  const contractFile = req.files.contract;
  const content = await pdfParse(contractFile.data);
  
  res.send({ content: content.text });
});

// Cadastro de Contratos
app.post('/contracts', async (req, res) => {
  try {
    const { title, signDate, expiryDate, parties, summary } = req.body;
    const newContract = await Contract.query().insert({
      title,
      signDate,
      expiryDate,
      parties,
      summary,
    });
    res.status(201).json(newContract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contract.' });
  }
});

// Listagem de Contratos
app.get('/contracts', async (req, res) => {
  try {
    const contracts = await Contract.query();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contracts.' });
  }
});

// Detalhes de um Contrato Específico
app.get('/contracts/:id', async (req, res) => {
  try {
    const contract = await Contract.query().findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found.' });
    }
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contract details.' });
  }
});

// Edição de Contratos
app.put('/contracts/:id', async (req, res) => {
  try {
    const { title, signDate, expiryDate, parties, summary } = req.body;
    const updatedContract = await Contract.query().patchAndFetchById(req.params.id, {
      title,
      signDate,
      expiryDate,
      parties,
      summary,
    });
    res.json(updatedContract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contract.' });
  }
});

// Remoção de Contratos
app.delete('/contracts/:id', async (req, res) => {
  try {
    await Contract.query().deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contract.' });
  }
});

// Notificações de Contratos Próximos da Data de Validade
cron.schedule('0 9 * * *', async () => {
  try {
    const contracts = await Contract.query();
    const today = new Date();
    const upcomingContracts = contracts.filter(contract => {
      const expiryDate = new Date(contract.expiryDate);
      const diffTime = Math.abs(expiryDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    });

    upcomingContracts.forEach(contract => {
      sendNotificationEmail(contract);
    });
  } catch (error) {
    console.error('Failed to send notifications.', error);
  }
});

function sendNotificationEmail(contract) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'user@example.com',
    subject: 'Contract Expiry Notification',
    text: `The contract titled "${contract.title}" is expiring on ${contract.expiryDate}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
