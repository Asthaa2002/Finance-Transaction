const express = require('express');
const transactionController = require('../controllers/transaction');

// const userAuth = require("../middleware/auth")
const router = express.Router();

router.post('/create_transaction',transactionController.createTransaction);
router.get('/retrieve_transaction/:id',transactionController.getAllTransaction);
router.get("/get_transaction_summary/:id", transactionController.getTransactionSummary)
router.delete('/delete_transaction/:id',transactionController.deleteTransaction)


module.exports = router;