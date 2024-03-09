const transactionSchema = require("../models/transaction");
const accountSchema = require("../models/account");
const userSchema = require('../models/user')

exports.createTransaction = async (req, res) => {
  try {
    const { Transaction_type, amount, category, description, userAccount, userId } =
      req.body;
    const newTransaction = new transactionSchema({
      Transaction_type,
      amount,
      category,
      description,
      userId,
      userAccount
        });
    const savedTransaction = await newTransaction.save();

   return res.status(201).json({
      message: "Transaction created successfully",
      transaction: savedTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllTransaction = async (req, res) => {
  const {id } = req.params
  try {
    const findUser = await userSchema.findById(id)

    if(!findUser) {
      return res.status(404).json({message: 'No user found !'})
    }

    const transactions = await transactionSchema
      .find({userId: id})
      .populate(["userId", "userAccount"]);
    if (!transactions) {
      return res.status(404).json({ message: "No transactions found!!" });
    }

    return res
      .status(200)
      .json({ message: "Transactions fetched successfully", transactions });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTransactionSummary = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await userSchema.findById(id);
    if (!findUser) {
      return res.status(404).json({ message: "No user found" });
    }

    const findTransactions = await transactionSchema
      .find({ userId: id })
      .populate(["userAccount","userId"]);

    if (!findTransactions) {
      return res.status(404).json({
        message: "No transactions found for the specified time period.",
      });
    }

    const transactionData = findTransactions.map((transaction) => ({
      Transaction_type: transaction.Transaction_type || 0,
      amount: transaction.amount || 0,
      category: transaction.category || 0,
      userAccount: transaction.userAccount || 0,
      userId: transaction.userAccount || 0
    }));

    return res.status(200).json({
      message: "Transaction summary retrieved successfully",
      transactions: transactionData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};



exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const findTransaction = await transactionSchema.findById(id);
    if (!findTransaction) {
      return res.status(404).json({ message: "No transaction found" });
    }
    await transactionSchema.findByIdAndDelete(id); 
    return res
      .status(200)
      .json({ message: "Transaction removed successfully!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

