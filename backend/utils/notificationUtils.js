const { Contract } = require('../models/Contract');
const nodemailer = require('nodemailer');

const notifyExpiringContracts = async () => {
  try {
    const contracts = await Contract.query();
    const today = new Date();
    const inThreeDays = new Date(today);
    inThreeDays.setDate(today.getDate() + 3);

    const expiringContracts = contracts.filter(contract => {
      const dateValid = new Date(contract.dateValid);
      return dateValid >= today && dateValid <= inThreeDays;
    });

    expiringContracts.forEach(contract => {
      sendEmailNotification(contract);
    });
  } catch (error) {
    console.error('Erro ao verificar contratos próximos da validade:', error);
  }
};

const sendEmailNotification = (contract) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL,
    subject: 'Contrato Próximo da Data de Validade',
    text: `O contrato "${contract.title}" está próximo da data de validade (${contract.dateValid}).`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar email:', error);
    } else {
      console.log('Email enviado:', info.response);
    }
  });
};

module.exports = {
  notifyExpiringContracts,
};
