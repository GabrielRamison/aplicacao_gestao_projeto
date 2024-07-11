// upload de arquivos
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


module.exports = upload;


const { Contract } = require('../models/Contract');

const upload = (req, res) => {
  // Implementação do upload
};

const uploadContract = async (req, res) => {
  // Implementação do upload do contrato
};

const createContract = async (req, res) => {
  // Implementação da criação do contrato
};

const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.query();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContractById = async (req, res) => {
  try {
    const contract = await Contract.query().findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateContract = async (req, res) => {
  try {
    const contract = await Contract.query().patchAndFetchById(req.params.id, req.body);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteContract = async (req, res) => {
  try {
    const numDeleted = await Contract.query().deleteById(req.params.id);
    if (numDeleted === 0) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  upload,
  uploadContract,
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract,
};

// funções para upload, leitura de PDF e cadastro.
const fs = require('fs');
const pdf = require('pdf-parse');
const Contract = require('../models/Contract');

exports.uploadContract = (req, res) => {
    let dataBuffer = fs.readFileSync(req.file.path);

    pdf(dataBuffer).then(async function(data) {
        // Extrair informações do PDF para o cadastro
        const contract = new Contract({
            title: req.body.title,
            signDate: req.body.signDate,
            expiryDate: req.body.expiryDate,
            parties: req.body.parties,
            summary: data.text.substring(0, 1000), // Resumo do conteúdo do PDF
            filePath: req.file.path
        });

        await contract.save();
        res.send('Upload e cadastro realizados com sucesso!');
    }).catch(err => {
        res.status(500).send('Erro ao processar o arquivo PDF');
    });
};

// funções para listar, detalhar, editar e remover contratos.
exports.getContracts = async (req, res) => {
  const contracts = await Contract.find();
  res.json(contracts);
};

exports.getContractById = async (req, res) => {
  const contract = await Contract.findById(req.params.id);
  if (contract) {
      res.json(contract);
  } else {
      res.status(404).send('Contrato não encontrado');
  }
};

exports.updateContract = async (req, res) => {
  const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(contract);
};

exports.deleteContract = async (req, res) => {
  await Contract.findByIdAndDelete(req.params.id);
  res.send('Contrato removido com sucesso');
};
