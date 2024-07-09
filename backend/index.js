

const express = require('express');
const knex = require('knex');
const { Model } = require('objection');
const cron = require('node-cron');
const contractRoutes = require('./routes/contractRoutes');
const { notifyExpiringContracts } = require('./utils/notificationUtils');
require('dotenv').config();

const app = express();

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

Model.knex(db);

app.use(express.json());
app.use('/contracts', contractRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

cron.schedule('0 8 * * *', notifyExpiringContracts);
