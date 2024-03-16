const express = require('express');
const transactionController = require('../controllers/transaction');

const userAuthentication = require("../middleware/auth")
const router = express.Router();

router.post('/create_transaction', userAuthentication,transactionController.createTransaction);
router.get('/retrieve_transaction/:id',userAuthentication,transactionController.getAllTransaction);
router.get("/get_transaction_summary/:id", userAuthentication,transactionController.getTransactionSummary)
router.delete('/delete_transaction/:id',userAuthentication,transactionController.deleteTransaction)


module.exports = router;