const express = require('express');
const accountController = require('../controllers/account');

const router = express.Router();

router.post('/create_account', accountController.createAccount);
router.get('/get_account', accountController.getAccounts);

module.exports = router;