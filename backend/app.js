// backend/app.js
const express = require('express');
const app = express();
const contractRoutes = require('./routes/contractRoutes');

app.use(express.json());
app.use('/contracts', contractRoutes);

module.exports = app;
