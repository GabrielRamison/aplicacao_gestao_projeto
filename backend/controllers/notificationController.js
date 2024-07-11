const Contract = require('../models/Contract');
const nodemailer = require('nodemailer');

exports.sendNotifications = async () => {
  const contracts = await Contract.query();
  const upcomingExpirations = contracts.filter(contract => {
    const now = new Date();
    const expiryDate = new Date(contract.expiryDate);
    const diffTime = Math.abs(expiryDate - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 30;
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  for (const contract of upcomingExpirations) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'user@example.com', // Altere para o email do usuário
      subject: 'Contrato próximo da data de validade',
      text: `O contrato ${contract.title} está próximo da data de validade.`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  }
};
