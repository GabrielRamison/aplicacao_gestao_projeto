const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const upload = require('../middlewares/uploadMiddleware');
const auth = require('../middlewares/authMiddleware');

router.post('/upload', auth, upload.single('contract'), contractController.uploadContract);
router.get('/', auth, contractController.getContracts);
router.get('/:id', auth, contractController.getContractById);
router.put('/:id', auth, contractController.updateContract);
router.delete('/:id', auth, contractController.deleteContract);

module.exports = router;
