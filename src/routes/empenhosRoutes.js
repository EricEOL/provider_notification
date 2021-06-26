const express = require('express');
const router = express.Router();
const empenhosController = require('../controllers/empenhosController');

router.get('/', empenhosController.all);

router.get('/notification', empenhosController.notificationSupplier);

router.post('/', empenhosController.insertNewEmpenho);

module.exports = router;